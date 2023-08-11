import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, server$, z } from "@builder.io/qwik-city";
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { InvoicesList } from "~/modules/invoices/InvoicePrimitives";
import { queryNotionDatabase } from "~/server/notion";

export const useInvoices = routeLoader$(async (event) => {
  return queryNotionDatabase({ event, page_size: 10 });
});

export const queryInvoices = server$(async function (startCursor: string) {
  const parsed = await z.string().parseAsync(startCursor);

  return queryNotionDatabase({
    event: this,
    page_size: 10,
    start_cursor: parsed,
  });
});

export default component$(() => {
  const initialInvoices = useInvoices();

  const invoices = useSignal<QueryDatabaseResponse>(initialInvoices.value);

  return (
    <div>
      <InvoicesList
        invoices={invoices.value}
        onMoreClick$={async (cursor) => {
          const newInvoices = await queryInvoices(cursor);

          invoices.value = {
            ...newInvoices,
            results: [...invoices.value.results, ...newInvoices.results],
          };
        }}
      />
    </div>
  );
});
