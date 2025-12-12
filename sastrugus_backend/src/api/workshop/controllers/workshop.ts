/**
 * workshop controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::workshop.workshop', ({ strapi }) => ({
  async me(ctx) {
    if (!ctx.state.user) {
      return ctx.unauthorized('You must be logged in');
    }

    const workshops = await strapi.db.query('api::workshop.workshop').findMany({
      where: { owner: ctx.state.user.id },
      populate: ['workshop_category'],
    });

    return { data: workshops };
  },

  async mePurchased(ctx) {
    if (!ctx.state.user) {
      return ctx.unauthorized('You must be logged in');
    }

    // Find successful purchases for current user
    const purchases = await strapi.db.query('api::purchase.purchase').findMany({
      where: {
        User: ctx.state.user.id,
        success: true,
      },
      populate: ['Workshop'],
    });

    // Extract workshops from purchases
    const workshops = purchases
      .map(p => p.Workshop)
      .filter(Boolean);

    return { data: workshops };
  },
}));
