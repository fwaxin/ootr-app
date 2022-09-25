import differenceInSeconds from 'date-fns/differenceInSeconds';
import type { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

import SessionSummary from 'components/schedule/SessionSummary';
import { Schedule } from 'types';

const Home: NextPage = () => {
  const { data: schedule } = useSWR<Schedule>('/api/schedule/');

  const onGoingSessionList = schedule?.filter(
    (session) => differenceInSeconds(new Date(session.start), new Date()) <= 0,
  );
  const comingSessionList = schedule?.filter((session) => differenceInSeconds(new Date(session.start), new Date()) > 0);

  return (
    <>
      <Head>
        <title>OoTR Ladder - Schedule</title>
      </Head>

      {schedule && schedule.length === 0 ? (
        <div className="flex px-5 py-3 rounded-lg border-amber-300 bg-amber-100 text-yellow-600 font-semibold">
          <p>No session planned</p>
        </div>
      ) : (
        <div className="flex w-full lg:w-1/2">
          {onGoingSessionList && onGoingSessionList?.length > 0 && (
            <div className="flex flex-col w-full">
              <div className="prose prose-slate prose-headings:my-4 dark:prose-invert">
                <h2>Session(s) in progress</h2>
              </div>
              <div className="w-full flex flex-col gap-6">
                {onGoingSessionList
                  .sort((sessionA, sessionB) =>
                    sessionA.sessionId !== sessionB.sessionId ? (sessionA.sessionId > sessionB.sessionId ? 1 : -1) : 0,
                  )
                  .map((scheduleItem) => {
                    return (
                      <SessionSummary
                        key={`session-${scheduleItem.ladderType}-${scheduleItem.sessionId}`}
                        {...scheduleItem}
                        inProgress
                      />
                    );
                  })}
              </div>
            </div>
          )}
          {comingSessionList && comingSessionList?.length > 0 && (
            <div className="flex flex-col w-full">
              <div className="prose prose-slate prose-headings:my-4 dark:prose-invert">
                <h2>Schedule</h2>
              </div>
              <div className="w-full flex flex-col gap-6">
                {comingSessionList
                  .sort((sessionA, sessionB) =>
                    sessionA.sessionId !== sessionB.sessionId ? (sessionA.sessionId > sessionB.sessionId ? 1 : -1) : 0,
                  )
                  .map((scheduleItem) => {
                    return (
                      <SessionSummary
                        key={`session-${scheduleItem.ladderType}-${scheduleItem.sessionId}`}
                        {...scheduleItem}
                      />
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
