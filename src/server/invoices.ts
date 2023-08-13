import type { RequestEventBase } from "@builder.io/qwik-city";
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { queryNotionDatabase } from "./notion";

const databaseResponseToInvoice = (
  response: QueryDatabaseResponse["results"][0],
) => {
  if ("properties" in response) {
    const properties = response.properties;

    const titleToPlainText = (
      property: (typeof properties)[0],
      log: string,
    ) => {
      if (property.type !== "title") {
        throw new Error(`parsing-error: ${property.type} - ${log}`);
      }
      return property.title.map((entry) => entry.plain_text).join(" ");
    };

    const richTextToPlainText = (
      property: (typeof properties)[0],
      log: string,
    ) => {
      if (property.type !== "rich_text") {
        throw new Error(`parsing-error: ${property.type} - ${log}`);
      }
      return property.rich_text.map((entry) => entry.plain_text).join(" ");
    };

    const numberToPlainNumber = (
      property: (typeof properties)[0],
      log: string,
    ) => {
      if (property.type !== "number" || typeof property.number !== "number") {
        throw new Error(`parsing-error: ${property.type} - ${log}`);
      }
      return property.number;
    };

    const dateToPlainDate = (property: (typeof properties)[0], log: string) => {
      if (property.type !== "date" || !property.date?.start) {
        throw new Error(`parsing-error: ${property.type} - ${log}`);
      }
      return property.date.start;
    };

    const uniqueIdToPlainText = (
      property: (typeof properties)[0],
      log: string,
    ) => {
      if (property.type !== "unique_id" || !property.unique_id.number) {
        throw new Error(`parsing-error: ${property.type} - ${log}`);
      }
      return property.unique_id.number;
    };

    try {
      console.log("properties", properties);
      return {
        buyerAddress1: titleToPlainText(
          properties.buyerAddress1,
          "buyerAddress1",
        ),
        buyerAddress2: richTextToPlainText(
          properties.buyerAddress2,
          "buyerAddress2",
        ),
        buyerName: richTextToPlainText(properties.buyerName, "buyerName"),
        buyerNip: numberToPlainNumber(properties.buyerNip, "buyerNip"),
        city: richTextToPlainText(properties.city, "city"),
        date: dateToPlainDate(properties.date, "date"),
        id: uniqueIdToPlainText(properties.ID, "ID"),
        invoiceTitle: richTextToPlainText(
          properties.invoiceTitle,
          "invoiceTitle",
        ),
        notes: richTextToPlainText(properties.notes, "notes"),
        paymentAccount: richTextToPlainText(
          properties.paymentAccount,
          "paymentAccount",
        ),
        paymentBank: richTextToPlainText(properties.paymentBank, "paymentBank"),
        paymentMethod: richTextToPlainText(
          properties.paymentMethod,
          "paymentMethod",
        ),
        sellerAddress1: richTextToPlainText(
          properties.sellerAddress1,
          "sellerAddress1",
        ),
        sellerAddress2: richTextToPlainText(
          properties.sellerAddress2,
          "sellerAddress2",
        ),
        sellerName: richTextToPlainText(properties.sellerName, "sellerName"),
        sellerNip: numberToPlainNumber(properties.sellerNip, "sellerNip"),
        serviceCount: numberToPlainNumber(
          properties.serviceCount,
          "serviceCount",
        ),
        servicePayed: numberToPlainNumber(
          properties.servicePayed,
          "servicePayed",
        ),
        servicePrice: numberToPlainNumber(
          properties.servicePrice,
          "servicePrice",
        ),
        serviceTitle: richTextToPlainText(
          properties.serviceTitle,
          "serviceTitle",
        ),
        serviceUnit: richTextToPlainText(properties.serviceUnit, "serviceUnit"),
      };
    } catch (err) {
      console.log("err", err);
      return null;
    }
  }
  return null;
};

export type Invoice = NonNullable<ReturnType<typeof databaseResponseToInvoice>>;

type QueryInvoicesArgs = {
  event: RequestEventBase;
  startCursor?: string;
};

export const queryInvoices = async ({
  event,
  startCursor,
}: QueryInvoicesArgs) => {
  const response = await queryNotionDatabase({
    event,
    page_size: 10,
    start_cursor: startCursor,
  });

  const results: Invoice[] = [];

  response.results.forEach((entry) => {
    const invoice = databaseResponseToInvoice(entry);
    if (invoice) {
      results.push(invoice);
    }
  });

  return { ...response, results };
};

export type QueryInvoicesResponse = Awaited<ReturnType<typeof queryInvoices>>;
