export type User = {
  id?: string;
  username?: string;
  discriminator?: string;
  avatar?: string;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
  isLoggedIn?: boolean;
  pronoun?: string;
  profile?: string;
};

export type LeaderBoard = {
  userId?: number,
  userName: string;
  userDiscordName: string;
  startingElo: number;
  currentElo: number;
  nbRaces: number;
  nbVictories: number;
  nbDefeats: number;
  nbDraws: number;
}[];

export type DiscordAPIResponse = {
  error?: any;
  error_description?: string;
  access_token: string;
  token_type?: string;
  expires_in: string;
  refresh_token?: string;
  scope?: string;
};

export type MenuRoute = {
  name: string;
  href?: string;
  startIcon?: JSX.Element;
  routes?: MenuRoute;
}[];
