import type { RequestEventCommon } from "@builder.io/qwik-city";
import { z } from "@builder.io/qwik-city";
import jwt from "jsonwebtoken";
import { buildSearchParams } from "~/utils/searchParams";
import { getServerEnv } from "./env";

type AuthFetchArgs = {
  event: RequestEventCommon;
  init?: RequestInit;
  path: string;
  query?: Record<string, unknown>;
};

export const authFetch = (args: AuthFetchArgs) => {
  const config = getServerEnv(args.event);

  const search = buildSearchParams(args.query);

  const url = `https://${config.domain}${args.path}?${search}`;

  return fetch(url, args.init);
};

export const getAuthTokenSchema = () => {
  return z.object({ code: z.string(), state: z.string() });
};

type GetAuthTokenArgs = z.infer<ReturnType<typeof getAuthTokenSchema>> & {
  event: RequestEventCommon;
};

export const getAuthToken = async (args: GetAuthTokenArgs) => {
  const config = getServerEnv(args.event);

  const result = await authFetch({
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

  const json = await result.json();

  console.log("json", json);

  return json;
};

export type Session = {
  userId: string;
  iat: number;
  exp: number;
};

const options = {
  httpOnly: true,
  maxAge: 0,
  name: "__session",
  path: "/",
  sameSite: "lax",
} as const;

const SESSION_COOKIE_KEY = "__session";

export const createSession = (event: RequestEventCommon, userId: string) => {
  const env = getServerEnv(event);

  const token = jwt.sign({ userId }, env.sessionSecret, { expiresIn: "7d" });

  event.cookie.set(SESSION_COOKIE_KEY, token, {
    ...options,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: env.nodeEnv === "production",
  });
};

export const deleteSession = (event: RequestEventCommon) => {
  event.cookie.delete(SESSION_COOKIE_KEY, options);
};

const getSession = (event: RequestEventCommon): Session | null => {
  const token = event.cookie.get(SESSION_COOKIE_KEY)?.value;
  const env = getServerEnv(event);

  if (!token) {
    return null;
  }

  try {
    const session = jwt.verify(token, env.sessionSecret);

    return session as Session;
  } catch (err) {
    deleteSession(event);

    return null;
  }
};

const SESSION_CACHE_KEY = "__session";

export const getRequestSession = (
  event: RequestEventCommon,
): Session | null => {
  const value = event.sharedMap.get(SESSION_CACHE_KEY);

  if (value) {
    return value.session;
  }

  const session = getSession(event);

  event.sharedMap.set(SESSION_CACHE_KEY, { session });

  return session;
};

export const clearRequestSession = (event: RequestEventCommon) => {
  event.sharedMap.set(SESSION_CACHE_KEY, { session: null });
};
