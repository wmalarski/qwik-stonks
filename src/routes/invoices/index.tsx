import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, server$, z } from "@builder.io/qwik-city";
import { InvoicesList } from "~/modules/invoices/InvoicePrimitives";
import { queryInvoices, type QueryInvoicesResponse } from "~/server/invoices";

export const useInvoices = routeLoader$(async (event) => {
  return queryInvoices({ event });
});

export const moreInvoices = server$(async function (startCursor: string) {
  const parsed = await z.string().parseAsync(startCursor);

  return queryInvoices({ event: this, startCursor: parsed });
});

export default component$(() => {
  const initialInvoices = useInvoices();

  const invoices = useSignal<QueryInvoicesResponse>(initialInvoices.value);

  return (
    <div>
      <InvoicesList
        invoices={invoices.value}
        onMoreClick$={async (cursor) => {
          const newInvoices = await moreInvoices(cursor);

          invoices.value = {
            ...newInvoices,
            results: [...invoices.value.results, ...newInvoices.results],
          };
        }}
      />
    </div>
  );
});
