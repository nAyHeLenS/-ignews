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
  );

  // pegar todos osdados da subscription
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
      id: subscription.id,
      userId: userRef,
      status: subscription.status,
      
  }

  // salvar os dados da subscription do usuário no faunadb
  await fauna.query(
      q.Create(
          q.Collection('subscriptions'),
          { data: subscription }
      )
  )
}
