import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import auth0 from "auth0-js";
import { Button } from "~/components/Button";
import { getRequestCookieSession } from "~/server/auth";
import { paths } from "~/utils/paths";

export const usePublicLoader = routeLoader$((event) => {
  const session = getRequestCookieSession(event);

  if (session) {
    throw event.redirect(302, paths.invoices);
  }

  return null;
});

export default component$(() => {
  usePublicLoader();

  return (
    <div>
      <Button
        onClick$={() => {
          const webAuth = new auth0.WebAuth({
            domain: import.meta.env.PUBLIC_AUTH0_DOMAIN,
            clientID: import.meta.env.PUBLIC_AUTH0_CLIENT_ID,
            redirectUri: import.meta.env.PUBLIC_AUTH0_REDIRECT_URL,
            responseType: "code",
          });

          webAuth.authorize({ connection: "google-oauth2" });
        }}
      >
        Sign In
      </Button>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik Stonks",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
