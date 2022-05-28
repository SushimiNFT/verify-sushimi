import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetch(`https://discord.com/api/v9/users/${req.query.id}`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_API_KEY}`,
    },
  }).then((data) => data.json());

  res.status(200).json({ name: `${data.username}#${data.discriminator}` });
}
