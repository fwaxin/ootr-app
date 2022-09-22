import { NextPage } from 'next';
import Head from 'next/head';

import { DEFAULT_LADDER_TYPE, LADDER_CAT_READABLE_NAME } from 'config/appConfig';
import { LeaderBoard } from 'types';

interface LeaderBoardPageProps {
  ladderType: string;
  leaderboardData: LeaderBoard;
}

const LeaderboardPage: NextPage<LeaderBoardPageProps> = ({ ladderType, leaderboardData }) => {
  return (
    <>
      <Head>
        <title>{`OoTR Ladder - Leaderboard ${LADDER_CAT_READABLE_NAME[ladderType]}`}</title>
      </Head>
      <div className="prose prose-slate prose-headings:my-4 dark:prose-invert">
        <h1>Leaderboard {LADDER_CAT_READABLE_NAME[ladderType]}</h1>
      </div>
      {leaderboardData.length === 0 ? (
        <div className="flex px-5 py-3 rounded-lg border-amber-300 bg-amber-100 text-yellow-600 font-semibold">
          <p>No data has been found the given category</p>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-auto">
          <div className="my-8 overflow-hidden">
            <div className="table border-collapse table-auto w-full">
              <div className="table-header-group">
                <div className="table-row">
                  <div className="table-cell text-left border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200">
                    #
                  </div>
                  <div className="table-cell text-left border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200">
                    Player name
                  </div>
                  <div className="table-cell text-left border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200">
                    Races played
                  </div>
                  <div className="table-cell text-left border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200">
                    Current score
                  </div>
                </div>
              </div>
              <div className="table-row-group">
                {leaderboardData.map((playerData, index) => (
                  <div key={`player-${index}`} className="table-row hover:bg-slate-100">
                    <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {index + 1}
                    </div>
                    <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {playerData.userName}
                    </div>
                    <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {playerData.nbRaces}
                    </div>
                    <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {playerData.currentElo}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getStaticProps = async ({ ...context }) => {
  const { league } = context.params;
  const leaderboardData: LeaderBoard = await fetch(
    `${process.env.LADDER_BOT_HOSTNAME}/leaderboard?ladderType=${encodeURIComponent(league || DEFAULT_LADDER_TYPE)}`,
  ).then((res) => res.json());

  if (!leaderboardData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ladderType: league,
      leaderboardData,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths = async () => {
  const ladderTypeList: { id: number; label: string }[] = await fetch(
    `${process.env.LADDER_BOT_HOSTNAME}/data/ladderTypes`,
  ).then((res) => res.json());

  const paths = ladderTypeList.map((ladderType) => ({
    params: {
      league: ladderType.label,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default LeaderboardPage;
