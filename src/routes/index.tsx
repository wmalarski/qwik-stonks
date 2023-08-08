import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import auth0 from "auth0-js";
import { Button } from "~/components/Button";
import { getNotionUser } from "~/server/notion";

export const useNotionUsersLoader = routeLoader$(async (event) => {
  const user = await getNotionUser(event);

  return user;
});

export default component$(() => {
  const notionUsers = useNotionUsersLoader();

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
      <pre>{JSON.stringify(notionUsers.value, null, 2)}</pre>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
