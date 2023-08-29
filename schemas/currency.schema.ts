export interface ICurrency {
  id?: number;
  gateway_id: number;
  prefix: string;
  currency_name: string;
  min_amount: number;
  max_amount: number;
  reserve: number;
  default_send: number;
  default_receive: number;
  status: number;
  position?: number;
  success_text?: string;
  fail_text?: string;
  created_at?: string;
  updated_at?: string;
}