import { FC, useEffect, useMemo, useState } from 'react';

import Typography from '@mui/material/Typography';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import getTime from 'date-fns/getTime';

import { ONE_HOUR, ONE_MINUTE } from 'constant';

interface TimerProps {
  startDate: Date;
}

const Timer: FC<TimerProps> = ({ startDate }) => {
  const [currentTime, setCurrentTime] = useState<number>(getTime(new Date()));
  const diffInMillis = differenceInMilliseconds(currentTime, startDate);

  const getTimer = () => {
    if (diffInMillis < 1) {
      return null;
    }

    const hours = Math.floor(diffInMillis / (1000 * ONE_HOUR));
    const minutes = Math.floor((diffInMillis - hours * (1000 * ONE_HOUR)) / (1000 * ONE_MINUTE));
    const seconds = Math.floor((diffInMillis - hours * (1000 * ONE_HOUR) - minutes * (1000 * ONE_MINUTE)) / 1000);
    const milliseconds = Math.floor(
      diffInMillis - hours * (1000 * ONE_HOUR) - minutes * (1000 * ONE_MINUTE) - seconds * 1000,
    );

    return {
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  };

  const timer = useMemo(getTimer, [currentTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = getTime(new Date());
      setCurrentTime(now);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {timer && (
        <Typography variant="overline" lineHeight={1}>
          {timer.hours.toString().padStart(1, '0')}:{timer.minutes.toString().padStart(2, '0')}:
          {timer.seconds.toString().padStart(2, '0')}.{timer.milliseconds.toString().slice(0, 2)}
        </Typography>
      )}
    </>
  );
};

export default Timer;
