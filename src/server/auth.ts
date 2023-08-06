import { z } from "@builder.io/qwik-city";
import type { RequestEvent } from "@builder.io/qwik-city/middleware/request-handler";
import { buildSearchParams } from "~/utils/searchParams";

export const getAuthConfig = (env: RequestEvent["env"]) => {
  return {
    domain: env.get("PUBLIC_AUTH0_DOMAIN")!,
    clientID: env.get("PUBLIC_AUTH0_CLIENT_ID")!,
    redirectUri: env.get("PUBLIC_AUTH0_REDIRECT_URL")!,
    clientSecret: env.get("AUTH0_CLIENT_SECRET")!,
  };
};

type AuthFetchArgs = {
  event: RequestEvent;
  init?: RequestInit;
  path: string;
  query?: Record<string, unknown>;
};

export const authFetch = (args: AuthFetchArgs) => {
  const config = getAuthConfig(args.event.env);

  const search = buildSearchParams(args.query);

  const url = `https://${config.domain}${args.path}?${search}`;

  return fetch(url, args.init);
};

export const getAuthTokenSchema = () => {
  return z.object({ code: z.string(), state: z.string() });
};

type GetAuthTokenArgs = z.infer<ReturnType<typeof getAuthTokenSchema>> & {
  event: RequestEvent;
};

export const getAuthToken = async (args: GetAuthTokenArgs) => {
  const config = getAuthConfig(args.event.env);

  console.log("config", config);

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
