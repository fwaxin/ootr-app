import { NextApiRequest, NextApiResponse } from "next";

const ladderLeaderboard = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const leaderboardInformations = await fetch(
      `${process.env.LADDER_BOT_HOSTNAME}/leaderboard`,
      {
        method: "GET",
      }
    ).then((res) => res.json());

    res.send(leaderboardInformations);
  } catch (e) {
    res.redirect("/?r=false");
  }
};

export default ladderLeaderboard;