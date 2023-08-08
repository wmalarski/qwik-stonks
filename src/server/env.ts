import { z, type RequestEventCommon } from "@builder.io/qwik-city";

const ENV_CACHE_KEY = "__env";

const getServerEnvSchema = () => {
  return z.object({
    clientID: z.string(),
    clientSecret: z.string(),
    nodeEnv: z.string(),
    domain: z.string(),
    notionDatabase: z.string(),
    notionKey: z.string(),
    redirectUri: z.string(),
    sessionSecret: z.string(),
  });
};

export const getServerEnv = (
  event: RequestEventCommon,
): z.infer<ReturnType<typeof getServerEnvSchema>> => {
  const cached = event.sharedMap.get(ENV_CACHE_KEY);

  if (cached) {
    return cached;
  }

  const parsed = getServerEnvSchema().parse({
    clientID: event.env.get("PUBLIC_AUTH0_CLIENT_ID"),
    clientSecret: event.env.get("AUTH0_CLIENT_SECRET"),
    domain: event.env.get("PUBLIC_AUTH0_DOMAIN"),
    notionDatabase: event.env.get("NOTION_DATABASE"),
    notionKey: event.env.get("NOTION_KEY"),
    redirectUri: event.env.get("PUBLIC_AUTH0_REDIRECT_URL"),
    sessionSecret: event.env.get("SESSION_SECRET"),
    nodeEnv: event.env.get("NODE_ENV"),
  });

  event.sharedMap.set(ENV_CACHE_KEY, parsed);

  return parsed;
};
