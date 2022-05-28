import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetch(`${process.env.HOLDER_BOT_URL}/submitMessage`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: req.body,
  });

  res.status(200).end();
}
