import type { IronSessionOptions } from "iron-session";

import type { User } from "../types";

export const sessionOption: IronSessionOptions = {
  cookieName: "ootr-ladder-user-session",
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  }
}

declare module "iron-session" {
  interface IronSessionData {
    user?: User
  }
}
