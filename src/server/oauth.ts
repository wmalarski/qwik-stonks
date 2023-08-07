import type { RequestEventCommon } from "@builder.io/qwik-city";
import { z } from "@builder.io/qwik-city";
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

export type Session = {
  access_token: string;
  id_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
};

export const getOAuthSession = async (
  args: GetAuthTokenArgs,
): Promise<Session> => {
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

  return result.json();
};
