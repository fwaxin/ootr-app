import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next';

import { sessionOption } from '../../../lib/session';

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const OAuthScope = ["identify"].join(" ");
  const OAuth2Params: URLSearchParams = new URLSearchParams({
    'response_type': 'code',
    'client_id': process.env.DISCORD_CLIENT_ID as string,
    'redirect_uri': `${process.env.APP_DOMAIN}/api/auth/callback`,
    'scope': OAuthScope
  });

  res.redirect(`${process.env.DISCORD_API_ENDPOINT}/oauth2/authorize?${OAuth2Params}`);
}

export default withIronSessionApiRoute(handler, sessionOption);
