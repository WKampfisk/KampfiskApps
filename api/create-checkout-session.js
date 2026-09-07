import Stripe from 'stripe'

const products = {
  // Add products here after creating their prices in Stripe Dashboard.
  // Example: 'shroomfinder-pro': process.env.STRIPE_PRICE_SHROOMFINDER_PRO,
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const productId = req.body?.productId
  const price = products[productId]
  if (!price) return res.status(400).json({ error: 'Unknown or unavailable product' })
  if (!process.env.STRIPE_SECRET_KEY) return res.status(503).json({ error: 'Payments are not configured' })

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const origin = process.env.PUBLIC_SITE_URL || `https://${req.headers.host}`
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price, quantity: 1 }],
      client_reference_id: productId,
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancelled`,
      allow_promotion_codes: true,
    })
    return res.status(200).json({ url: session.url })
  } catch (error) {
    console.error('Stripe Checkout error', error)
    return res.status(500).json({ error: 'Unable to create checkout session' })
  }
}
