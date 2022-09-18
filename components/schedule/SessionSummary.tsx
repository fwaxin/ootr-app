import { FC } from 'react';

import formatInTimeZone from 'date-fns-tz/formatInTimeZone';

import Countdown from 'components/Countdown';
import Timer from 'components/Timer';
import { LADDER_CAT_READABLE_NAME } from 'config/appConfig';

interface SessionSummaryProps {
  sessionId: number;
  start: Date;
  ladderType: string;
  inProgress?: boolean;
}

const SessionSummary: FC<SessionSummaryProps> = ({ sessionId, start: startDate, ladderType, inProgress }) => {
  return (
    <div className="flex px-6 py-4 overflow-hidden relative rounded-lg shadow-lg z-50 bg-white">
      <div>
        <p className="uppercase font-bold text-sky-600">{LADDER_CAT_READABLE_NAME[ladderType]}</p>
        <div className="inline-flex gap-x-4 text-slate-400 text-xs">
          <div className="flex gap-x-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
              />
            </svg>
            {sessionId}
          </div>
          <div className="flex gap-x-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            {formatInTimeZone(new Date(startDate), 'UTC', "MM/dd/yyyy - H'h'mm")} UTC
          </div>
        </div>
      </div>
      <div className="absolute right-5 -bottom-2">
        {inProgress ? <Timer startDate={new Date(startDate)} /> : <Countdown deadline={new Date(startDate)} />}
      </div>
    </div>
  );
};

export default SessionSummary;
