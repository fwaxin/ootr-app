import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { sessionOption } from "../../lib/session";

const userRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.session.user) {
    res.json({
      ...req.session.user
    });
  } else {
    res.json({});
  }
};

export default withIronSessionApiRoute(userRoute, sessionOption);
