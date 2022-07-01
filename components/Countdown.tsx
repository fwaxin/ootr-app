import { FC, useEffect, useMemo, useState } from "react";
import { getTime } from "date-fns";

import differenceInSeconds from "date-fns/differenceInSeconds";
import { ONE_DAY, ONE_HOUR, ONE_MINUTE } from "constant";
import { Typography } from "@mui/material";

interface CountdownProps {
  deadline: Date;
}

const Countdown: FC<CountdownProps> = ({ deadline }) => {
  const [currentDateTime, setCurrentDateTime] = useState<number>(
    getTime(new Date())
  );
  const diffInSeconds = differenceInSeconds(deadline, currentDateTime);

  const getCountdown = () => {
    if (diffInSeconds <= 1) {
      return null;
    }

    const days = Math.floor(diffInSeconds / ONE_DAY);
    const hours = Math.floor((diffInSeconds - days * ONE_DAY) / ONE_HOUR);
    const minutes = Math.floor(
      (diffInSeconds - days * ONE_DAY - hours * ONE_HOUR) / ONE_MINUTE
    );
    const seconds =
      diffInSeconds - days * ONE_DAY - hours * ONE_HOUR - minutes * ONE_MINUTE;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const countdown = useMemo(getCountdown, [currentDateTime]);

  useEffect(() => {
    setInterval(() => {
      const now = getTime(new Date());
      setCurrentDateTime(now);
    }, 1000);
  }, []);

  return (
    <>
      {!countdown ? (
        <></>
      ) : (
        <Typography>
          {countdown.days > 0 && `${countdown.days}d `}
          {countdown.hours > 0 && `${countdown.hours}h `}
          {countdown.minutes >= 0 && `${countdown.minutes}m `}
          {countdown.seconds}s
        </Typography>
      )}
    </>
  );
};

export default Countdown;
