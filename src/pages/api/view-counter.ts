// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'



export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { sid, p } = req.query;
    const url: string = `https://script.google.com/macros/s/${sid}/exec?path=${p}`;

    fetch(url, { redirect: 'follow' }).then(resp => {
        resp.text().then(txt => {
            console.log(txt);
            res.setHeader('Content-Type', 'image/svg+xml');
            res.setHeader('Cache-Control', 'no-store');
            return res.status(200).send(txt);
        });
    });
}