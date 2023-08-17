import { component$, type PropFunction } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Invoice, QueryInvoicesResponse } from "~/server/invoices";
import { paths } from "~/utils/paths";

type InvoiceDetailsProps = {
  invoice: Invoice;
};

export const InvoiceDetails = component$<InvoiceDetailsProps>((props) => {
  return (
    <section>
      INVOICE
      <pre>{JSON.stringify(props.invoice, null, 2)}</pre>
      <Link href={paths.copyInvoice(props.invoice.id)}>Copy</Link>
      <Link href={paths.editInvoice(props.invoice.id)}>Edit</Link>
      <Link href={paths.invoice(props.invoice.id)}>More</Link>
    </section>
  );
});

type InvoiceListItemProps = {
  invoice: Invoice;
};

export const InvoiceListItem = component$<InvoiceListItemProps>((props) => {
  return (
    <section>
      <pre>{JSON.stringify(props.invoice, null, 2)}</pre>
      <Link href={paths.copyInvoice(props.invoice.id)}>Copy</Link>
      <Link href={paths.editInvoice(props.invoice.id)}>Edit</Link>
      <Link href={paths.invoice(props.invoice.id)}>More</Link>
    </section>
  );
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
