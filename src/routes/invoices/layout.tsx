import { Slot, component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { Button } from "~/components/Button";
import {
  clearRequestSession,
  deleteCookieSession,
  getRequestCookieSession,
} from "~/server/auth";
import { paths } from "~/utils/paths";

export const useSessionLoader = routeLoader$((event) => {
  const session = getRequestCookieSession(event);

  if (!session) {
    throw event.redirect(302, paths.home);
  }

  return session;
});

export const useSignOutAction = routeAction$((_data, event) => {
  clearRequestSession(event);
  deleteCookieSession(event);

  throw event.redirect(302, paths.home);
});

export default component$(() => {
  useSessionLoader();

  const signOut = useSignOutAction();

  return (
    <div>
      <header>
        <h1>Invoices</h1>
      </header>
      <section>
        <Slot />
      </section>
      <div>
        <Form action={signOut}>
          <Button>Sign Out</Button>
        </Form>
      </div>
    </div>
  );
});
