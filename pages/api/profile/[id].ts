import { NextApiRequest, NextApiResponse } from 'next';

const ladderProfile = async ({ query: { id }, ...req }: NextApiRequest, res: NextApiResponse) => {
  try {
    const profileInformations = await fetch(
      `${process.env.LADDER_BOT_HOSTNAME}/player/${encodeURIComponent((id as string).replace('-', '#'))}`,
      {
        method: 'GET',
        headers: {
          'X-ApiKey': `${process.env.LADDER_BOT_API_KEY}`,
        },
      },
    ).then((res) => res.json());

    if (req?.session?.user) {
      // Omit variables we don't want to include in session by destructuring
      const { id, avatarUrl, ...cleanedProfileInformations } = profileInformations;

      const newUserSession = { ...req.session.user, ...cleanedProfileInformations };
      await req.session.destroy();
      req.session.user = newUserSession;
      await req.session.save();
    }

    res.send(profileInformations);
  } catch (e) {
    console.error('Request failed with given error : ', e);
    res.redirect('/?r=false');
  }
};

export default ladderProfile;
