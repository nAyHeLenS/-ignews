import { fauna } from "../../../services/fauna";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
){
    // buscar ususário no faunadb com id costumerId - stripe_customer_id
    const userRef = await fauna.query(
       q.Select(
           'ref',
           q.Get(
            q.Match(
                q.Index('user_by_stripe_customer_id'),
                customerId
            )
        )
       )
    )

    // salvar os dados da subscription do usuário no faunadb
}