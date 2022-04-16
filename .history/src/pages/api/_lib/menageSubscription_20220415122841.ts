import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string
) {
  // buscar ususário no faunadb com id costumerId - stripe_customer_id
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
          q.Match(q.Index("user_by_stripe_customer_id"), 
          customerId
          )
       )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  // salvar os dados da subscription do usuário no faunadb
}
