import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getNotionUsers } from "~/server/notion";

export const useNotionUsersLoader = routeLoader$(async (event) => {
  const users = await getNotionUsers(event);

  return users;
});

export const useInvoices = routeLoader$(() => {
  return { a: 4 };
});

export default component$(() => {
  const notionUsers = useNotionUsersLoader();

  return <pre>{JSON.stringify(notionUsers.value, null, 2)}</pre>;
});
