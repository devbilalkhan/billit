import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
  typescript: true,
});


export const getStripeSession = async ({
  priceId,
  domainUrl,
  customerId,
}: {
  priceId: string;
  domainUrl: string;
  customerId: string;
}) => {
  // Validate inputs
  if (!priceId || !domainUrl || !customerId) {
    throw new Error('Missing required parameters: priceId, domainUrl, or customerId');
  }

  // Ensure domainUrl is properly formatted
  const formattedDomainUrl = domainUrl.endsWith('/') ? domainUrl.slice(0, -1) : domainUrl;

  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      billing_address_collection: 'auto',
      line_items: [{ price: priceId, quantity: 1 }],
      payment_method_types: ['card'],
      customer_update: {
        address: 'auto',
        name: 'auto',
      },
      success_url: `${formattedDomainUrl}/payment/success`,
      cancel_url: `${formattedDomainUrl}/payment/cancelled`,
    });

    if (!session.url) {
      throw new Error('Failed to create Stripe session');
    }

    return session.url as string;
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    throw new Error('An error occurred while creating the Stripe session');
  }
};
