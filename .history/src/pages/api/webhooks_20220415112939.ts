import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';

async function buffer(readble: Readable){
    const chunks = []; // pedaços da stream

    for await (const chunk of readble){
        chunks.push(
            typeof chunk  === 'string' ? Buffer.from(chunk) : chunk
        );
    }

    return Buffer.concat(chunks);
}

export const config = {
    api: {
        bodyParser: false
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) =>{
    // verfifiar metodo
    if(req.method === 'POST'){
       const buf = await buffer(req)
       // buf - é a requisição em si
    

       res.status(200).json({ ok: true })
   } else{
       res.setHeader('Allow', 'POST')
       res.status(405).end('Method not allowed')
   }
}

// adicionar eventos ao cli - stripe trigger payment_intent.succeede