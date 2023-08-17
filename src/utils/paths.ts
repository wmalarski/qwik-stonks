export const paths = {
  authCallback: "/auth/callback",
  copyInvoice: (id: number) => `/invoices/${id}/copy`,
  create: "/invoices/create",
  editInvoice: (id: number) => `/invoices/${id}/edit`,
  home: "/",
  invoice: (id: number) => `/invoices/${id}`,
  invoices: "/invoices",
  notFound: "/404",
};
