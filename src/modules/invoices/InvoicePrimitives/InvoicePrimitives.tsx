import { component$, type PropFunction } from "@builder.io/qwik";
import type { Invoice, QueryInvoicesResponse } from "~/server/invoices";

type InvoiceListItemProps = {
  invoice: Invoice;
};

export const InvoiceListItem = component$<InvoiceListItemProps>((props) => {
  // if (props.invoice.object !== "database") {
  //   return null;
  // }

  return <pre>{JSON.stringify(props.invoice, null, 2)}</pre>;
});

type InvoicesListProps = {
  invoices: QueryInvoicesResponse;
  onMoreClick$: PropFunction<(cursor: string) => void>;
};

export const InvoicesList = component$<InvoicesListProps>((props) => {
  const nextCursor = props.invoices.next_cursor;
  const onMoreClick = props.onMoreClick$;

  return (
    <div>
      {props.invoices.results.map((invoice) => (
        <InvoiceListItem key={invoice.id} invoice={invoice} />
      ))}
      {props.invoices.has_more ? (
        <button
          onClick$={async () => {
            if (nextCursor) {
              onMoreClick(nextCursor);
            }
          }}
        >
          Load more
        </button>
      ) : null}
    </div>
  );
});
