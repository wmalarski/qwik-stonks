import type { RequestEventCommon } from "@builder.io/qwik-city";
import { buildSearchParams } from "~/utils/searchParams";
import { getServerEnv } from "./env";

export type Session = {
  access_token: string;
  id_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
};

export type User = {
  sub: string;
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
};

type AuthFetchArgs = {
  event: RequestEventCommon;
  init?: RequestInit;
  path: string;
  query?: Record<string, unknown>;
  session?: Session;
};

export const authFetch = (args: AuthFetchArgs) => {
  const config = getServerEnv(args.event);

  const search = buildSearchParams(args.query);

  const url = `https://${config.domain}${args.path}?${search}`;

  const init = args.session
    ? {
        ...args.init,
        headers: {
          Authorization: `${args.session.token_type} ${args.session.access_token}`,
          ...args.init?.headers,
        },
      }
    : args.init;

  return fetch(url, init);
};

export const authFetchJson = async <T>(args: AuthFetchArgs): Promise<T> => {
  const response = await authFetch(args);
  return await response.json();
};

type ExchangeAuthTokenArgs = {
  code: string;
  event: RequestEventCommon;
};

export const exchangeAuthToken = (args: ExchangeAuthTokenArgs) => {
  const config = getServerEnv(args.event);

  return authFetchJson<Session>({
    event: args.event,
    path: "/oauth/token",
    init: {
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: config.clientID,
        client_secret: config.clientSecret,
        code: args.code,
        redirect_uri: config.redirectUri,
      }),
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
    },
  });
};

type GetAuthUserInfoArgs = {
  event: RequestEventCommon;
  session: Session;
};

export const getAuthUserInfo = (args: GetAuthUserInfoArgs) => {
  return authFetchJson<User>({
    event: args.event,
    path: "/userinfo",
    session: args.session,
  });
};
