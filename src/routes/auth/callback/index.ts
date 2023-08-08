import { type RequestHandler } from "@builder.io/qwik-city";
import { createCookieSession } from "~/server/auth";
import { getNotionDatabase, getNotionUser } from "~/server/notion";
import { getAuthTokenSchema, getOAuthSession } from "~/server/oauth";
import { paths } from "~/utils/paths";

export const onGet: RequestHandler = async (event) => {
  console.log("event", event.env);

  const parsed = await getAuthTokenSchema().parseAsync(
    Object.fromEntries(event.query.entries()),
  );

  const session = await getOAuthSession({ ...parsed, event });

  console.log({ session });

  const user = await getNotionUser(event);
  const database = await getNotionDatabase(event);

  console.log({ user, database });

  createCookieSession(event, session);

  throw event.redirect(302, paths.invoices);
};
