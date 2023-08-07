import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useInvoices = routeLoader$(() => {
  return { a: 4 };
});

export default component$(() => {
  return <pre></pre>;
});
