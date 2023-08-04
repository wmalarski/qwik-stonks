import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import auth0 from "auth0-js";

export default component$(() => {
  return (
    <button
      onClick$={() => {
        const webAuth = new auth0.WebAuth({
          domain: import.meta.env.PUBLIC_AUTH0_DOMAIN,
          clientID: import.meta.env.PUBLIC_AUTH0_CLIENT_ID,
          redirectUri: import.meta.env.PUBLIC_AUTH0_REDIRECT_URL,
        });

        webAuth.authorize({ connection: "google-oauth2" });
      }}
    >
      Sign In
    </button>
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
