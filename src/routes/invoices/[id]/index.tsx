import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { InvoiceDetails } from "~/modules/invoices/InvoicePrimitives";
import { queryInvoices } from "~/server/invoices";

export const useInvoice = routeLoader$(async (event) => {
  return queryInvoices({ event });
});

export default component$(() => {
  const invoice = useInvoice();

  return <InvoiceDetails invoice={invoice.value} />;
});
