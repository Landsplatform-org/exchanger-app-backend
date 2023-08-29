export interface IReview {
  id?: number;
  user_id: number;
  review_title: string;
  review_text: string;
  review_status: string;
  created_at?: string;
  updated_at?: string;
}