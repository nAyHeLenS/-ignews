import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        {id: 1, name: 'Nayara'},
        {id: 2, name: 'Mayk'},
        {id: 3, name: 'Diego'},
        {id: 4, name: 'jak'},
    ]

    return response.json(users)
}

// jwt - salvo no storage
// next auth - sistema de autenticação simples 
// 