import { Client } from 'faunadb';

export const fauna = new Client({
    secret: process.env.FAUNADB_KEY
})

/**
 * * as operações feitas no banco de dados, stripe ou qualquer coisa que tenha acesso a uma chave, não podem ser feitas no browser
 * só podem ser realizadas dentro das api routes - api -
*/