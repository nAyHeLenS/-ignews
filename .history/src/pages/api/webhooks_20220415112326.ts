import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';

async function buffer(readble: Readable){
    // 
    const chunks = []; // pedaços da stream

    for await (const chunk of readble){
        chunks.push(
            typeof chunk  === 'string' ? Buffer.from(chunk) : chunk
        );
    }

    return Buffer.concat(chunks);
}

export default async (req: NextApiRequest, res: NextApiResponse) =>{
    const buf = await buffer(req)
    

    res.status(200).json({ ok: true })
}

// adicionar eventos ao cli - stripe trigger payment_intent.succeede