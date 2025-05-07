
export type SeoTextT = {
  content: string;
  id: number;
  page: string;
};

export type FeedbackResponse = {
  success: boolean;
  message: string;
};

export type FeedbackT = {
  name: string;
  phone: string;
  comment: string;
  isAgree: boolean;
  subject?: string;
}