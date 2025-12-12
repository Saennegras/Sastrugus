import crypto from 'crypto';
import axios from 'axios';

const CONFIG = {
  MERCHANT_ID: process.env.SIMPLEPAY_MERCHANT_ID,
  SECRET_KEY: process.env.SIMPLEPAY_SECRET_KEY,
  BACKEND_URL: process.env.STRAPI_BACKEND_URL || 'http://localhost:1337',
  URL: process.env.SIMPLEPAY_SANDBOX === 'true' 
    ? 'https://sandbox.simplepay.hu/payment/v2/start' 
    : 'https://secure.simplepay.hu/payment/v2/start',
};

export default {
    //Sign data with HMAC-SHA384
  getSignature(data: any) {
    const jsonString = JSON.stringify(data);
    const hmac = crypto.createHmac('sha384', CONFIG.SECRET_KEY || '');
    hmac.update(jsonString);
    return hmac.digest('base64');
  },

  // Start transaction
  async startTransaction(params: { 
    refno: string; 
    amount: number; 
    email: string; 
    userId: string | number;
    workshopTitle: string; 
  }) {
    const { refno, amount, email, workshopTitle } = params;

    // split workshopTitle if too long for SimplePay
    const prefix = "Prémium workshop: ";
    const maxTitleLength = 100;
    let safeTitle = workshopTitle || 'Workshop';
    
    if ((prefix.length + safeTitle.length) > maxTitleLength) {
      safeTitle = safeTitle.substring(0, maxTitleLength - prefix.length - 3) + '...';
    }
    const finalItemName = `${prefix}${safeTitle}`;

    const payload = {
      salt: crypto.randomBytes(16).toString('hex'),
      merchant: CONFIG.MERCHANT_ID,
      orderRef: refno,
      currency: 'HUF',
      customerEmail: email,
      language: 'HU',
      sdkVersion: 'StrapiV5_Custom',
      methods: ['CARD'],
      total: amount,
      url: `${CONFIG.BACKEND_URL}/api/payment/callback?refno=${refno}`,
      items: [
        {
          ref: 'workshop_access',
          title: finalItemName,
          amount: 1,
          price: amount,
          tax: 0,
        }
      ],
    };

    const signature = this.getSignature(payload);

    try {
      const response = await axios.post(CONFIG.URL, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Signature': signature,
        },
      });
      return response.data.paymentUrl;
    } catch (error: any) {
      console.error('SimplePay Hiba:', error.response?.data || error.message);
      throw new Error('Nem sikerült kommunikálni a fizetési szolgáltatóval.');
    }
  },

  // check response signature (responseJsonString is the raw base64-decoded JSON string)
  validateResponse(responseSignature: string, responseJsonString: string) {
    const hmac = crypto.createHmac('sha384', CONFIG.SECRET_KEY || '');
    hmac.update(responseJsonString);
    const mySignature = hmac.digest('base64');
    return mySignature === responseSignature;
  }
};