import { NextApiRequest, NextApiResponse } from 'next'
import { gql, request } from 'graphql-request'

const query = gql`
  {
    products {
      id
      name
      subtitle
      priceVariants {
        weight
        price
      }

      thumbnail {
        url
        fileName
        alt
      }
    }
  }
`

type Item = {
  price_data: any
  quantity: any
}

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */
import { validateCartItems } from '@/lib/cartItems'
// import inventory from '../../../data/products'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const validProducts = await request(
        `${process.env.HYGRAPH_CONTENT_API}`,
        query,
        {
          authorization: `Bearer ${process.env.HYGRAPH_PRODUCTION}`,
        }
      )

      // Validate the cart details that were sent from the client.
      const line_items = validateCartItems(
        validProducts.products as any,
        req.body
      )
      // const hasSubscription = line_items.find((item) => {
      //   return !!item.price_data.recurring
      // })

      const total = line_items
        .map((item: Item) => item.price_data.unit_amount * item.quantity)
        .reduce((prev: number, price: number) => prev + price)

      console.log('total: ', total)

      let shippingRates
      if (total > 5000) {
        shippingRates = {}
      } else {
        shippingRates = await fetch(
          `https://api.stripe.com/v1/shipping_rates/
          ${process!.env!.STRIPE_SHIPPING_RATE}`,
          {
            headers: {
              Authorization: `Bearer ${process!.env!.STRIPE_SECRET_KEY}`,
            },
          }
        ).then((response) => response.json())
      }

      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ['US'],
        },
        shipping_options: [
          shippingRates
            ? {
                shipping_rate_data: {
                  display_name: shippingRates.display_name,
                  fixed_amount: shippingRates.fixed_amount,
                  type: shippingRates.type,
                },
              }
            : {},
        ],
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/use-shopping-cart`,
        mode: 'payment', // hasSubscription ? 'subscription' :
      }
      console.log('line items:', line_items)

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params)

      res.status(200).json(checkoutSession)
    } catch (err) {
      console.error(err)
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
