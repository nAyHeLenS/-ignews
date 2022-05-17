import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  // buscar ususário no faunadb com id costumerId - stripe_customer_id
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
          q.Match(
              q.Index("user_by_stripe_customer_id"), 
              customerId
          )
       )
    )
  );

  // pegar todos os dados da subscription
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
      id: subscription.id,
      userId: userRef,
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
  }

  // salvar os dados da subscription do usuário no faunadb
  /*
  await fauna.query(
      q.Create(
          q.Collection('subscriptions'),
          { data: subscriptionData }
      )
  )
  */
 console.log('Action', createAction)

  if (createAction) {

   try{
    await fauna.query(
      q.Create(
        q.Collection('subscriptions'),
        { data: subscriptionData }
      )
    )
    console.log('subscription criada')
   } catch (err) {
     console.log(err)
   }

  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscription.id,
            )
          )
        ),
        { data: subscriptionData }
      )
    )
  }

}

/** 
 * * JAMStack :
 * um coneito que partiu do futuro do front-end
 * * JavaScript API Marckup
 * 
 * * CMS
 * * Content Menaagement System
 * 
 * wordpress
 * ghost (blog)
 * keystone
 * strapi
 * 
 * e commerce
 * shopfy
 * saleor
 * 
 * pagos
 * graphcms
 * prismic cms -> choose
 * contentful
*/