import TimerOutlined from '@mui/icons-material/TimerOutlined';
import { useTheme } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/system';
import formatInTimeZone from 'date-fns-tz/formatInTimeZone';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import type { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

import Countdown from 'components/Countdown';
import Timer from 'components/Timer';
import { LADDER_CAT_READABLE_NAME } from 'constant';
import { Schedule } from 'types';

const Home: NextPage = () => {
  const theme = useTheme();
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
        <Alert variant="outlined" severity="warning">
          No session planned
        </Alert>
      ) : (
        <Grid container>
          <Grid item xs={12} md={6} container rowSpacing={4}>
            {onGoingSessionList && onGoingSessionList?.length > 0 && (
              <Grid item container xs={12}>
                <Typography variant="h2" component="h1" mb={3}>
                  Session in progress
                </Typography>
                <Stack spacing={3} sx={{ width: '100%' }}>
                  {onGoingSessionList
                    .sort((sessionA, sessionB) =>
                      sessionA.sessionId !== sessionB.sessionId
                        ? sessionA.sessionId > sessionB.sessionId
                          ? 1
                          : -1
                        : 0,
                    )
                    .map((scheduleItem) => {
                      return (
                        <Grid key={`session-${scheduleItem.ladderType}-${scheduleItem.sessionId}`} item xs={12}>
                          <Card
                            elevation={3}
                            sx={{
                              px: 3,
                              py: 2,
                              width: '100%',
                              overflow: 'hidden',
                              position: 'relative',
                            }}
                          >
                            <CardContent
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                              }}
                            >
                              <Box>
                                <Typography variant="h6" textTransform="uppercase" lineHeight={1} color="primary">
                                  {LADDER_CAT_READABLE_NAME[scheduleItem.ladderType]}
                                </Typography>
                                <Typography variant="overline" lineHeight={1}>
                                  {formatInTimeZone(new Date(scheduleItem.start), 'UTC', "MM/dd/yyyy - H'h'mm")} UTC
                                </Typography>
                              </Box>
                              <Box>
                                <Timer startDate={new Date(scheduleItem.start)} />
                              </Box>
                            </CardContent>
                            <TimerOutlined
                              sx={{
                                fontSize: 85,
                                color: alpha(theme.palette.primary.light, 0.1),
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                                transform: 'translate(25%, 25%)',
                                zIndex: 0,
                              }}
                            />
                          </Card>
                        </Grid>
                      );
                    })}
                </Stack>
              </Grid>
            )}
            {comingSessionList && comingSessionList?.length > 0 && (
              <Grid item container xs={12}>
                <Typography variant="h2" component="h1" mb={3}>
                  Schedule
                </Typography>
                <Stack spacing={3} sx={{ width: '100%' }}>
                  {comingSessionList
                    .sort((sessionA, sessionB) =>
                      sessionA.sessionId !== sessionB.sessionId
                        ? sessionA.sessionId > sessionB.sessionId
                          ? 1
                          : -1
                        : 0,
                    )
                    .map((scheduleItem) => {
                      return (
                        <Grid key={`session-${scheduleItem.ladderType}-${scheduleItem.sessionId}`} item xs={12}>
                          <Card
                            elevation={3}
                            sx={{
                              px: 3,
                              py: 2,
                              width: '100%',
                              overflow: 'hidden',
                              position: 'relative',
                            }}
                          >
                            <CardContent
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                              }}
                            >
                              <Box>
                                <Typography variant="h6" textTransform="uppercase" lineHeight={1} color="primary">
                                  {LADDER_CAT_READABLE_NAME[scheduleItem.ladderType]}
                                </Typography>
                                <Typography variant="overline" lineHeight={1}>
                                  {formatInTimeZone(new Date(scheduleItem.start), 'UTC', "MM/dd/yyyy - H'h'mm")} UTC
                                </Typography>
                              </Box>
                              <Box>
                                <Countdown deadline={new Date(scheduleItem.start)} />
                              </Box>
                            </CardContent>
                            <TimerOutlined
                              sx={{
                                fontSize: 85,
                                color: alpha(theme.palette.primary.light, 0.1),
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                                transform: 'translate(25%, 25%)',
                                zIndex: 0,
                              }}
                            />
                          </Card>
                        </Grid>
                      );
                    })}
                </Stack>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
