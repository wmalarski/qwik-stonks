import { type RequestHandler } from "@builder.io/qwik-city";
import { getAuthToken, getAuthTokenSchema } from "~/server/auth";

export const onGet: RequestHandler = async (event) => {
  console.log("event", event.env);

  const parsed = await getAuthTokenSchema().parseAsync(
    Object.fromEntries(event.query.entries()),
  );

  const response = await getAuthToken({ ...parsed, event });

  console.log("response", response);

  throw event.redirect(302, "/");
};
