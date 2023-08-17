import { component$ } from "@builder.io/qwik";
import { routeLoader$, z } from "@builder.io/qwik-city";
import { InvoiceDetails } from "~/modules/invoices/InvoicePrimitives";
import { queryInvoice } from "~/server/invoices";
import { paths } from "~/utils/paths";

export const useInvoice = routeLoader$(async (event) => {
  const parsed = z.coerce.number().parse(event.params.id);

  const result = await queryInvoice({ event, id: parsed });

  if (!result) {
    throw event.redirect(302, paths.notFound);
  }

  return result;
});

export default component$(() => {
  const invoice = useInvoice();

  return <InvoiceDetails invoice={invoice.value} />;
});
