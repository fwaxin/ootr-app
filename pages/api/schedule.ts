import { NextApiRequest, NextApiResponse } from 'next';

const ladderSchedule = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const scheduleInformations = await fetch(`${process.env.LADDER_BOT_HOSTNAME}/session/schedule`, {
      method: 'GET',
      headers: {
        'X-ApiKey': `${process.env.LADDER_BOT_API_KEY}`,
      },
    }).then((res) => res.json());

    res.send(scheduleInformations);
  } catch (e) {
    res.redirect('/?r=false');
  }
};

export default ladderSchedule;
