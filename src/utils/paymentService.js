const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
    });
    return paymentIntent;
  } catch (error) {
    throw new Error(`Payment error: ${error.message}`);
  }
};

const confirmPayment = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent.status === 'succeeded';
  } catch (error) {
    throw new Error(`Error confirming payment: ${error.message}`);
  }
};

const refundPayment = async (paymentIntentId, amount) => {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: Math.round(amount * 100),
    });
    return refund;
  } catch (error) {
    throw new Error(`Refund error: ${error.message}`);
  }
};

module.exports = {
  createPaymentIntent,
  confirmPayment,
  refundPayment,
};
