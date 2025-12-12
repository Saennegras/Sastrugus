export default {
  routes: [
    {
      method: 'POST',
      path: '/payment/init',
      handler: 'payment.init',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/payment/callback',
      handler: 'payment.callback',
      config: {
        auth: false, // have to be public for SimplePay to access for now. TODO: Proxy through frontend?
        policies: [],
        middlewares: [],
      },
    },
  ],
};