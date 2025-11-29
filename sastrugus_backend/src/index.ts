import type { Core } from '@strapi/strapi';
import { seed } from './_seed';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
      const shouldSeed = process.env.NODE_ENV === 'development' && process.env.SEED === 'true';
    
      if (!shouldSeed) {
        return;
     }
      strapi.log.info('Seeding initial data...');
      await seed(strapi);
      strapi.log.info('Seeding completed.');
      process.exit(0);
  },
};
