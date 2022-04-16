import { fauna } from "../../../services/fauna";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
){
    // buscar ususário no faunadb com id costumerId - stripe_customer_id
    const userRef = await fauna.query()

    // salvar os dados da subscription do usuário no faunadb
}