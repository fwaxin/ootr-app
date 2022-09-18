import { FC, useEffect, useMemo, useState } from 'react';

import { getTime } from 'date-fns';
import differenceInSeconds from 'date-fns/differenceInSeconds';

import { ONE_DAY, ONE_HOUR, ONE_MINUTE } from 'constant';

interface CountdownProps {
  deadline: Date;
}

const Countdown: FC<CountdownProps> = ({ deadline }) => {
  const [currentDateTime, setCurrentDateTime] = useState<number>(getTime(new Date()));
  const diffInSeconds = differenceInSeconds(deadline, currentDateTime);

  const getCountdown = () => {
    if (diffInSeconds <= 1) {
      return null;
    }

    const days = Math.floor(diffInSeconds / ONE_DAY);
    const hours = Math.floor((diffInSeconds - days * ONE_DAY) / ONE_HOUR);
    const minutes = Math.floor((diffInSeconds - days * ONE_DAY - hours * ONE_HOUR) / ONE_MINUTE);
    const seconds = diffInSeconds - days * ONE_DAY - hours * ONE_HOUR - minutes * ONE_MINUTE;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const countdown = useMemo(getCountdown, [currentDateTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = getTime(new Date());
      setCurrentDateTime(now);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {!countdown ? (
        <></>
      ) : (
        <span className="uppercase text-2xl font-extrabold text-sky-600/20 select-none">
          {countdown.days > 0 && `${countdown.days}d `}
          {countdown.hours > 0 && `${countdown.hours.toString().padStart(2, '0')}h `}
          {countdown.minutes >= 0 && `${countdown.minutes.toString().padStart(2, '0')}m `}
          {countdown.seconds.toString().padStart(2, '0')}s
        </span>
      )}
    </>
  );
};

export default Countdown;
