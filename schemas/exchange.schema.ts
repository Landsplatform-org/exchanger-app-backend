export interface IExchange {
  ex_id?: number;
  user_id: number;
  direction_id: number;
  currency_id_send: number;
  currency_id_receive: number;
  hash: string;
  send_sum_without_fee: number;
  send_sum_with_fee: number;
  send_sum_fee?: number;
  send_client_sum_with_ps_fee?: number;
  send_client_ps_fee?: number;
  rate_out: number;
  rate_in: number;
  receive_sum_without_fee: number;
  receive_sum_with_fee: number;
  receive_sum_fee?: number;
  receive_client_sum_with_ps_fee?: number;
  receive_client_ps_fee?: number;
  u_field_1?: string;
  process_type_id: number;
  status_id: number;
  expired?: string;
  referral_amount_rub?: number;
  referral_amount_usd?: number;
  created_at?: string;
  updated_at?: string;

  currency_send?: string;
  currency_receive?: string;
  ex_status_name?: string;
  process_name?: string;
  id?: number;
}