export default {
  routes: [
    {
      method: 'GET',
      path: '/workshops/me',
      handler: 'workshop.me',
    },
    {
      method: 'GET',
      path: '/workshops/me/purchased',
      handler: 'workshop.mePurchased',
    },
  ],
};
