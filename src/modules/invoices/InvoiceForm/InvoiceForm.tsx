import { Slot, component$ } from "@builder.io/qwik";
import type { Invoice } from "~/server/invoices";

import { Button } from "~/components/Button";
import { Card, CardBody } from "~/components/Card";
import { DatePicker } from "~/components/DatePicker";
import { Divider } from "~/components/Divider";
import {
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
  TextFieldRoot,
  type TextFieldInputProps,
} from "~/components/TextField";

export type InvoiceFormData = Omit<Invoice, "id">;

const formDefault: InvoiceFormData = {
  buyerAddress1: "",
  buyerAddress2: "",
  buyerName: "",
  buyerNip: "",
  city: "",
  date: new Date().toDateString(),
  invoiceTitle: "",
  notes: "",
  paymentAccount: "",
  paymentBank: "",
  paymentMethod: "transfer",
  sellerAddress1: "",
  sellerAddress2: "",
  sellerName: "",
  sellerNip: "",
  serviceCount: 0,
  servicePayed: 0,
  servicePrice: 0,
  serviceTitle: "",
  serviceUnit: "",
};

type FormItemContainerProps = {
  error?: string;
  id: string;
  label: string;
};

const FormItemContainer = component$<FormItemContainerProps>((props) => {
  return (
    <TextFieldRoot>
      <TextFieldLabel for={props.id} class="font-semibold">
        {props.label}
      </TextFieldLabel>
      <div class="flex w-full flex-col gap-2">
        <Slot />
        <Show when={props.error}>
          {(error) => (
            <TextFieldErrorMessage>{error().message}</TextFieldErrorMessage>
          )}
        </Show>
      </div>
    </TextFieldRoot>
  );
});

type FormInputItemProps = TextFieldInputProps & {
  error?: ZodIssue;
  id: string;
  isLoading: boolean;
  label: string;
};

const FormInputItem = component$<FormInputItemProps>((props) => {
  return (
    <FormItemContainer label={props.label} id={props.id} error={props.error}>
      <TextFieldInput
        class="grow"
        variant="bordered"
        size="sm"
        disabled={props.isLoading}
        id={props.id}
        min={props.min}
        name={props.name}
        placeholder={props.label}
        step={props.step}
        type={props.type}
        value={props.value}
      />
    </FormItemContainer>
  );
});

const FormDivider = component$(() => {
  return <Divider class="col-span-2" />;
});

const SubHeading = component$(() => {
  return (
    <h3 class="col-span-2 text-xl">
      <Slot />
    </h3>
  );
});

type Props = {
  error?: Record<string, ZodIssue>;
  id?: string;
  initial?: InvoiceFormData;
  isLoading: boolean;
  onSubmit: (data: InvoiceFormData) => void;
};

export const InvoiceForm = component$<Props>((props) => {
  const [t] = useI18n();

  const [date, setDate] = createSignal(new Date(formDefault.date));

  const initial = () => {
    return { ...formDefault, ...props.initial };
  };

  const onSubmit: JSX.FormHTMLAttributes<HTMLFormElement>["onSubmit"] = (
    event,
  ) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    // TODO use form library
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props.onSubmit(Object.fromEntries(form.entries()) as any);
  };

  return (
    <Card>
      <CardBody>
        <form onSubmit$={onSubmit} class="grid w-full gap-2">
          <Show when={props.id}>
            {(id) => <input id="id" name="id" type="hidden" value={id()} />}
          </Show>
          <input
            id="date"
            name="date"
            type="hidden"
            value={date().toISOString()}
          />
          <input
            id="paymentMethod"
            name="paymentMethod"
            type="hidden"
            value={initial().paymentMethod}
          />
          <input
            id="servicePayed"
            name="servicePayed"
            type="hidden"
            value={initial().servicePayed}
          />
          <SubHeading>{t("invoiceForm.general")}</SubHeading>
          <FormInputItem
            isLoading={props.isLoading}
            id="city"
            name="city"
            label={t("invoiceForm.city")}
            type="text"
            value={initial().city}
            error={props.error?.city}
          />
          <FormItemContainer
            id="date"
            label={t("invoiceForm.date")}
            error={props.error?.date}
          >
            <DatePicker
              isDisabled={props.isLoading}
              id="date"
              value={date()}
              onChange={setDate}
            />
          </FormItemContainer>
          <FormInputItem
            isLoading={props.isLoading}
            id="invoiceTitle"
            name="invoiceTitle"
            label={t("invoiceForm.invoiceTitle")}
            type="text"
            value={initial().invoiceTitle}
            error={props.error?.invoiceTitle}
          />
          <FormDivider />
          <SubHeading>{t("invoiceForm.seller")}</SubHeading>
          <FormInputItem
            isLoading={props.isLoading}
            id="sellerAddress1"
            name="sellerAddress1"
            label={t("invoiceForm.sellerAddress1")}
            type="text"
            value={initial().sellerAddress1}
            error={props.error?.sellerAddress1}
          />
          <FormInputItem
            isLoading={props.isLoading}
            id="sellerAddress2"
            name="sellerAddress2"
            label={t("invoiceForm.sellerAddress2")}
            type="text"
            value={initial().sellerAddress2}
            error={props.error?.sellerAddress2}
          />
          <FormInputItem
            isLoading={props.isLoading}
            id="sellerName"
            name="sellerName"
            label={t("invoiceForm.sellerName")}
            type="text"
            value={initial().sellerName}
            error={props.error?.sellerName}
          />
          <FormInputItem
            isLoading={props.isLoading}
            id="sellerNip"
            name="sellerNip"
            label={t("invoiceForm.sellerNip")}
            type="text"
            value={initial().sellerNip}
            error={props.error?.sellerNip}
          />
          <FormDivider />
          <SubHeading>{t("invoiceForm.buyer")}</SubHeading>
          <FormInputItem
            isLoading={props.isLoading}
            id="buyerAddress1"
            name="buyerAddress1"
            label={t("invoiceForm.buyerAddress1")}
            type="text"
            value={initial().buyerAddress1}
            error={props.error?.buyerAddress1}
          />
          <FormInputItem
            isLoading={props.isLoading}
            id="buyerAddress2"
            name="buyerAddress2"
            label={t("invoiceForm.buyerAddress2")}
            type="text"
            value={initial().buyerAddress2}
            error={props.error?.buyerAddress2}
          />
          <FormInputItem
            isLoading={props.isLoading}
            id="buyerName"
            name="buyerName"
            label={t("invoiceForm.buyerName")}
            type="text"
            value={initial().buyerName}
            error={props.error?.buyerName}
          />
          <FormInputItem
            isLoading={props.isLoading}
            id="buyerNip"
            name="buyerNip"
            label={t("invoiceForm.buyerNip")}
            type="text"
            value={initial().buyerNip}
            error={props.error?.buyerNip}
          />
          <FormDivider />
          <SubHeading>{t("invoiceForm.payment")}</SubHeading>
          <FormInputItem
            isLoading={props.isLoading}
            id="paymentAccount"
            name="paymentAccount"
            label={t("invoiceForm.paymentAccount")}
            type="text"
            value={initial().paymentAccount}
            error={props.error?.paymentAccount}
          />
          <FormInputItem
            isLoading={props.isLoading}
            id="paymentBank"
            name="paymentBank"
            label={t("invoiceForm.paymentBank")}
            type="text"
            value={initial().paymentBank}
            error={props.error?.paymentBank}
          />
          <FormDivider />
          <SubHeading>{t("invoiceForm.service")}</SubHeading>
          <FormInputItem
            isLoading={props.isLoading}
            id="serviceCount"
            name="serviceCount"
            label={t("invoiceForm.serviceCount")}
            type="number"
            min={0}
            step={1}
            value={initial().serviceCount}
            error={props.error?.serviceCount}
          />
          <FormInputItem
            isLoading={props.isLoading}
            id="servicePrice"
            name="servicePrice"
            label={t("invoiceForm.servicePrice")}
            type="number"
            min={0}
            step={1}
            value={initial().servicePrice}
            error={props.error?.servicePrice}
          />
          <FormInputItem
            isLoading={props.isLoading}
            id="serviceTitle"
            name="serviceTitle"
            label={t("invoiceForm.serviceTitle")}
            type="text"
            value={initial().serviceTitle}
            error={props.error?.serviceTitle}
          />
          <FormInputItem
            isLoading={props.isLoading}
            id="serviceUnit"
            name="serviceUnit"
            label={t("invoiceForm.serviceUnit")}
            type="text"
            value={initial().serviceUnit}
            error={props.error?.serviceUnit}
          />
          <FormDivider />
          <SubHeading>{t("invoiceForm.notes")}</SubHeading>
          <FormInputItem
            isLoading={props.isLoading}
            id="notes"
            name="notes"
            label={t("invoiceForm.notes")}
            type="text"
            value={initial().notes}
            error={props.error?.notes}
          />
          <div class="col-span-2 flex w-full justify-end gap-2">
            <Button
              color="primary"
              disabled={props.isLoading}
              isLoading={props.isLoading}
              type="submit"
            >
              {t("invoiceForm.save")}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
});
