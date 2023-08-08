import type { RequestEventCommon } from "@builder.io/qwik-city";
import { Client } from "@notionhq/client";
import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
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

export const getNotionUsers = (event: RequestEventCommon) => {
  const notion = getNotionClient(event);

  return notion.users.list({});
};

export const getNotionDatabase = (event: RequestEventCommon) => {
  const env = getServerEnv(event);
  const notion = getNotionClient(event);

  return notion.databases.retrieve({ database_id: env.notionDatabase });
};

type QueryNotionDatabaseArgs = Omit<QueryDatabaseParameters, "database_id"> & {
  event: RequestEventCommon;
};

export const queryNotionDatabase = ({
  event,
  ...args
}: QueryNotionDatabaseArgs) => {
  const env = getServerEnv(event);
  const notion = getNotionClient(event);

  return notion.databases.query({ database_id: env.notionDatabase, ...args });
};
