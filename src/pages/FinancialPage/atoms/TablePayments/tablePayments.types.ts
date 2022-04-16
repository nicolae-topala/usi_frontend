import { getPayments } from 'libs/http/Financial/financial.types';

export interface headers {
  key: string;
  label: string;
}

export interface tableData {
  headers: headers[];
  values: getPayments[];
}

export interface Props {
  className?: string;
  caption?: string;
  tableData?: tableData;
  errorMessage?: string;
}
