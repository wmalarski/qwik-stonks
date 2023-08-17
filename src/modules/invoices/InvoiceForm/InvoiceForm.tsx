import { component$ } from "@builder.io/qwik";
import type { Invoice } from "~/server/invoices";

type InvoiceFormProps = {
  invoice?: Invoice;
};

export const InvoiceForm = component$<InvoiceFormProps>(() => {
  return <form></form>;
});
