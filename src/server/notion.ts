import type { RequestEventCommon } from "@builder.io/qwik-city";
import { Client } from "@notionhq/client";
import { getServerEnv } from "./env";

const NOTION_CACHE_KEY = "__notion";

const getNotionClient = (event: RequestEventCommon): Client => {
  const cached = event.sharedMap.get(NOTION_CACHE_KEY);

  if (cached) {
    return cached;
  }

  const env = getServerEnv(event);
  const notion = new Client({ auth: env.notionKey });

  event.sharedMap.set(NOTION_CACHE_KEY, notion);

  return notion;
};

export const getNotionUsers = async (event: RequestEventCommon) => {
  const notion = getNotionClient(event);

  const listUsersResponse = await notion.users.list({});

  return listUsersResponse;
};
