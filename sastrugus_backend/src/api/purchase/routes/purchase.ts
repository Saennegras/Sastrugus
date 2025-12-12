/**
 * purchase router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::purchase.purchase', {
  // By leaving it empty, we disable ALL default CRUD endpoints (find, findOne, create, update, delete).
  //Securty hint if we use the admin UI to remove role right, later an attacker could re-enable them via API calls, or an 
  //admin UI vulnerability. So we disable them here as well.
  only: [], 
});