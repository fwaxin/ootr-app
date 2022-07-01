import type { NextPage } from "next";
import {
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useSWR from "swr";

import { LeaderBoard } from "types";

const Home: NextPage = () => {
  const { data: leaderboardData } = useSWR<LeaderBoard>("/api/leaderboard/");

  return (
    <>
      <Typography variant="h2" component="h1" my={3}>
        Leaderboard
      </Typography>
      {!leaderboardData ? (
        <CircularProgress />
      ) : (
        <>
          {leaderboardData.length === 0 ? (
            <Alert variant="outlined" severity="warning">
              No data has been found the the given category
            </Alert>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Player name</TableCell>
                    <TableCell>Races played</TableCell>
                    <TableCell>Current score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboardData?.map((playerData, index) => (
                    <TableRow key={`player-${index}`} hover>
                      <TableCell>{playerData.userName}</TableCell>
                      <TableCell>{playerData.nbRaces}</TableCell>
                      <TableCell>{playerData.currentElo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </>
  );
};

export default Home;
