import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';



export default (req: NextApiRequest, res: NextApiResponse) =>{
    
    
    res.status(200).json({ ok: true })
}

// adicionar eventos ao cli - stripe trigger payment_intent.succeede