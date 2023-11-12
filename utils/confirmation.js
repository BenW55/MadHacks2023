import { Circle, CircleEnvironments } from '@circle-fin/circle-sdk';
import { circleSandboxApiKey } from '../data/constants';

// Instantiate Circle SDK Object with API key

const circle = new Circle(
    circleSandboxApiKey,
    CircleEnvironments.sandbox,
);

// Check for payment status
async function checkPaymentStatus(paymentIntentId) {
    const paymentIntent = await circle.cryptoPaymentIntents.getPaymentIntent(paymentIntentId);

    const paymentIds = paymentIntent.data.data.paymentIds
    let paymentId;

    // If payment has been made, paymentId will be a non-empty list
    if (paymentIds.length > 0){
        paymentId = paymentIds[0]
        return true
    }

    //console.log("payment hasn't been made yet!")
    return true
}

export { checkPaymentStatus }