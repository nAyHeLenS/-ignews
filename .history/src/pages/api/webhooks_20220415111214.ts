import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';

async function buffer(readble: Readable){
    const chunks = [];

    for await (const chunks of readble){
        chunks.push(
            typeof chunks === 'string' ? Buffer.from(chunks) : chunks
        );
    }

}

export default (req: NextApiRequest, res: NextApiResponse) =>{
    

    res.status(200).json({ ok: true })
}

// adicionar eventos ao cli - stripe trigger payment_intent.succeede