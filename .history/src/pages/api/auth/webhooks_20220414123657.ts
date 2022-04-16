import { NextRequest, NextResponse } from "next/server";

export default (req: NextApiRequest, res: NextApiResponse) =>{
    console.log('evento recebido');

    res.status(200).json({ ok; true})
    
}