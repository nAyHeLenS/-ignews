import { NextApiRequest, NextApiResponse } from "next";
import {} from '';



export default (req: NextApiRequest, res: NextApiResponse) =>{
    console.log('evento recebido')
    res.status(200).json({ ok: true })
}

// adicionar eventos ao cli - stripe trigger payment_intent.succeede