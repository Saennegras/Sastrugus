import type { Core } from '@strapi/strapi';
import simplePayService from '../../paymentMethods/simplepay';

declare const strapi: Core.Strapi;

export default {
  // 1. start payment (init)
  async init(ctx) {
    const user = ctx.state.user;
    const { workshopId } = ctx.request.body;
    console.log('Payment init requested for workshopId:', workshopId);

    if (!user) return ctx.unauthorized('A vásárláshoz be kell jelentkezned.');

const workshop = await strapi.documents('api::workshop.workshop').findOne({
      documentId: workshopId,
      populate: ['owner'],
      status: 'published',
    });

    if (!workshop) return ctx.notFound('A kért workshop nem található!!!');

    if (!workshop.isPremium) return ctx.badRequest('Ez a workshop ingyenes, nem szükséges megvásárolni.');

    // check owner
    const ownerId = workshop.owner?.documentId || workshop.owner?.id;
    if (workshop.owner?.documentId === user.documentId) {
      return ctx.badRequest('Saját workshopot nem vásárolhatsz meg.');
    }

    // check price. If zero or missing, error out
    const price = workshop.Decimal;
    if (!price || price <= 0) {
        return ctx.badRequest('Érvénytelen ár a workshopnál. Kérlek jelezd az adminisztrátornak.');
    }

    // Already purchased?
    const existingPurchase = await strapi.documents('api::purchase.purchase').findMany({
      filters: {
        User: { documentId: { $eq: user.documentId } },
        Workshop: { documentId: { $eq: workshop.documentId } },
        success: true,
      }
    });

    if (existingPurchase.length > 0) {
      return ctx.badRequest('Ezt a workshopot már korábban megvásároltad.');
    }

    // Create pending purchase entry

    const pendingPurchase = await strapi.documents('api::purchase.purchase').create({
      data: {
        Workshop: workshop.documentId, 
        User: user.documentId, 
        success: false,
        responseText: 'PENDING_PAYMENT',
        payloadLog: { stage: 'init_started' },
      },
      status: 'published',
      populate: ['Workshop', 'User'],
    });

    // call SimplePay to start transaction

    try {
      const paymentUrl = await simplePayService.startTransaction({
        refno: pendingPurchase.documentId,
        amount: price, 
        email: user.email,
        userId: user.id,
        workshopTitle: workshop.title
      });


      ctx.body = { paymentUrl };
    } catch (err) {
      console.error(err);
      await strapi.documents('api::purchase.purchase').update({
        documentId: pendingPurchase.documentId,
        data: { responseText: 'ERROR_IN_SIMPLEPAY_SIDE' }
      });
      return ctx.internalServerError('Hiba történt a fizetési szolgáltatóval való kommunikációban.');
    }
  },

  // 2. callback from SimplePay 
  async callback(ctx) {
    const { r, s, refno } = ctx.query;

    if (!r || !s) {
      return ctx.badRequest('Érvénytelen visszahívási paraméterek.');
    }

    let responseData;
    let responseJsonString;
    try {
        responseJsonString = Buffer.from(r as string, 'base64').toString('utf-8');
        responseData = JSON.parse(responseJsonString);
    } catch (e) {
        return ctx.badRequest('Hibás válasz formátum.');
    }

    // Check signature
    const isValid = simplePayService.validateResponse(s as string, responseJsonString);

    if (!isValid) {
      return ctx.forbidden('Biztonsági hiba: Érvénytelen aláírás.');
    }

    const orderRef = responseData.o;
    const eventStatus = responseData.e; // SUCCESS, FAIL, CANCEL, TIMEOUT

    if (!orderRef) {
      return ctx.badRequest('Hiányzó rendelési azonosító.');
    }

    // look up purchase
    const purchase = await strapi.documents('api::purchase.purchase').findOne({
      documentId: orderRef as string,
      populate: ['Workshop']
    });

    if (!purchase) return ctx.notFound('A keresett rendelés nem található az adatbázisban.');

    // Check status - SUCCESS means payment completed
    const isSuccess = eventStatus === 'SUCCESS';

    // Update database
    await strapi.documents('api::purchase.purchase').update({
      documentId: orderRef as string,
      data: {
        success: isSuccess,
        responseText: isSuccess ? 'Sikeres fizetés' : `Sikertelen: ${eventStatus}`,
        payloadLog: responseJsonString,
      }
    });

    // Redirect to frontend with result
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const workshop = purchase.Workshop as any;
    const slug = workshop?.slug 
      ? `${workshop.slug}---${workshop.documentId}` 
      : workshop?.documentId || 'home';

    if (isSuccess) {
      return ctx.redirect(`${frontendUrl}/workshop/blueprint/${slug}?payment=success`);
    } else {
      return ctx.redirect(`${frontendUrl}/workshop/blueprint/${slug}?payment=failed&reason=${eventStatus}`);
    }
  }
};
