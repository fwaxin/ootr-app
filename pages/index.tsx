import type { NextPage } from "next";

import { TimerOutlined } from "@mui/icons-material";
import {
  Alert,
  Box,
  Card,
  CardContent,
  colors,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import useSWR from "swr";

import { Schedule } from "types";
import { zonedTimeToUtc, formatInTimeZone } from "date-fns-tz";

import { LADDER_CAT_READABLE_NAME } from "constant";
import Countdown from "components/Countdown";

const Home: NextPage = () => {
  const { data: schedule } = useSWR<Schedule>("/api/schedule/");

  return (
    <>
      <Typography variant="h2" component="h1" my={3}>
        Schedule
      </Typography>

      {schedule && schedule.length === 0 ? (
        <Alert variant="outlined" severity="warning">
          No session planned
        </Alert>
      ) : (
        <Grid container>
          <Grid item container xs={12} md={6}>
            <Stack spacing={3} sx={{ width: "100%" }}>
              {schedule
                ?.sort((sessionA, sessionB) =>
                  sessionA.sessionId !== sessionB.sessionId
                    ? sessionA.sessionId > sessionB.sessionId
                      ? 1
                      : -1
                    : 0
                )
                .map((scheduleItem) => {
                  return (
                    <Grid
                      key={`session-${scheduleItem.ladderType}-${scheduleItem.sessionId}`}
                      item
                      xs={12}
                    >
                      <Card
                        elevation={3}
                        sx={{
                          px: 3,
                          py: 2,
                          width: "100%",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <CardContent
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                          }}
                        >
                          <Box>
                            <Typography
                              variant="h6"
                              textTransform="uppercase"
                              lineHeight={1}
                              color={colors.blue[700]}
                            >
                              {
                                LADDER_CAT_READABLE_NAME[
                                  scheduleItem.ladderType
                                ]
                              }
                            </Typography>
                            <Typography variant="overline" lineHeight={1}>
                              {formatInTimeZone(
                                new Date(scheduleItem.start),
                                "UTC",
                                "MM/dd/yyyy - H'h'mm"
                              )}{" "}
                              UTC
                            </Typography>
                          </Box>
                          <Box>
                            <Countdown
                              deadline={new Date(scheduleItem.start)}
                            />
                          </Box>
                        </CardContent>
                        <TimerOutlined
                          sx={{
                            fontSize: 85,
                            color: colors.blue[50],
                            position: "absolute",
                            right: 0,
                            bottom: 0,
                            transform: "translate(25%, 25%)",
                            zIndex: 0,
                          }}
                        />
                      </Card>
                    </Grid>
                  );
                })}
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
