import { type RequestHandler } from "@builder.io/qwik-city";
import { createCookieSession } from "~/server/auth";
import { getAuthTokenSchema, getOAuthSession } from "~/server/oauth";

export const onGet: RequestHandler = async (event) => {
  console.log("event", event.env);

  const parsed = await getAuthTokenSchema().parseAsync(
    Object.fromEntries(event.query.entries()),
  );

  const session = await getOAuthSession({ ...parsed, event });

  createCookieSession(event, session);

  throw event.redirect(302, "/");
};
