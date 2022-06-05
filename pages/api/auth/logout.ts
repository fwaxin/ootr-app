import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { sessionOption } from "../../../lib/session";
import { DiscordAPIResponse } from "../../../types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = req.session.user?.accessToken;
  console.log(accessToken);
  if (!accessToken) {
    return res.status(403).redirect("/403");
  }

  try {
    // Revoke Discord Token before destroying session
    const paramsToSend: Record<string, string> = {
      client_id: process.env.DISCORD_CLIENT_ID as string,
      client_secret: process.env.DISCORD_CLIENT_SECRET as string,
      token: accessToken as string,
    };
    const data: DiscordAPIResponse = await fetch(
      `${process.env.DISCORD_API_ENDPOINT}/oauth2/token/revoke`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: Object.entries(paramsToSend)
          .map(([key, value]) => {
            return (
              value && `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            );
          })
          .join("")
          .substring(1),
      }
    ).then((res) => res.json());

    if (data.error) {
      return res.status(403).redirect("/403");
    }

    // Destroy session
    req.session.destroy();

    res.redirect("/");
  } catch (e) {
    res.redirect("/?r=false");
  }
};

export default withIronSessionApiRoute(handler, sessionOption);
