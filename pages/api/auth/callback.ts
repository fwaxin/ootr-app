import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { sessionOption } from "../../../lib/session";
import { DiscordAPIResponse, User } from "../../../types";

export default withIronSessionApiRoute(handler, sessionOption);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.code) {
    return res.status(404).redirect("/404");
  }

  if (req.query.error) {
    return res.status(403).redirect("/403");
  }

  try {
    const paramsToSend: Record<string, string> = {
      client_id: process.env.DISCORD_CLIENT_ID as string,
      client_secret: process.env.DISCORD_CLIENT_SECRET as string,
      grant_type: "authorization_code",
      code: req.query.code as string,
      redirect_uri: `${process.env.APP_DOMAIN}/api/auth/callback`,
    };

    const tokenData: DiscordAPIResponse = await fetch(
      `${process.env.DISCORD_API_ENDPOINT}/oauth2/token`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: Object.entries(paramsToSend)
          .map(([key, value]) => {
            return (
              value &&
              `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            );
          })
          .join("")
          .substring(1),
      }
    ).then((res) => res.json());

    if (tokenData.error) {
      return res.status(403).redirect("/403");
    }

    const userData = (await fetch(
      `${process.env.DISCORD_API_ENDPOINT}/users/@me`,
      {
        headers: {
          Authorization: `${tokenData.token_type} ${tokenData.access_token}`,
        },
      }
    ).then((res) => res.json())) as User;

    if (userData.email === null) {
      return res
        .status(400)
        .send(
          "No e-mail linked to this account. Make sure everything is correctly set up in your account."
        );
    }
    req.session.user = {
      ...userData,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
    } as User;
    await req.session.save();

    res.redirect("/?r=true");
  } catch (e) {
    res.redirect("/?r=false");
  }
}
