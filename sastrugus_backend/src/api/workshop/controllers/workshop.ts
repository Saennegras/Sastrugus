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

    return { data: pickLatestVersions(workshops) };
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

    return { data: pickLatestVersions(workshops) };
  },
}));

/**
 * Strapi v5 can leave both draft and published rows for the same documentId.
 * If a published version exists, drop the remaining drafts; otherwise keep the newest draft.
 * https://github.com/strapi/strapi/issues/23790
 */
function pickLatestVersions(workshops: any[]) {
  const grouped = new Map<string, any[]>();

  for (const workshop of workshops || []) {
    const key = workshop.documentId || String(workshop.id);
    const existing = grouped.get(key) || [];
    existing.push(workshop);
    grouped.set(key, existing);
  }

  const result: any[] = [];

  grouped.forEach((items) => {
    const published = items.find((w) => w.publishedAt);
    if (published) {
      result.push(published);
      return;
    }

    const sorted = [...items].sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    if (sorted[0]) {
      result.push(sorted[0]);
    }
  });

  return result;
}
