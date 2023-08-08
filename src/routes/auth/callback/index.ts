import { type RequestHandler } from "@builder.io/qwik-city";
import { getNotionUsers } from "~/server/notion";
import { getAuthTokenSchema, getOAuthSession } from "~/server/oauth";

export const onGet: RequestHandler = async (event) => {
  console.log("event", event.env);

  const parsed = await getAuthTokenSchema().parseAsync(
    Object.fromEntries(event.query.entries()),
  );

  const session = await getOAuthSession({ ...parsed, event });

  const users = await getNotionUsers(event);

  // createCookieSession(event, session);

  console.log({ users, session });

  throw event.redirect(302, "/");
};
