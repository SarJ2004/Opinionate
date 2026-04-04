type OpinionFormType = {
  title?: string;
  description?: string;
};

type OpinionFormTypeError = {
  title?: string;
  description?: string;
  expires_at?: string;
  image?: string;
};

type OpinionType = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  expires_at: string;
  image: string;
  created_at: string;
};

type ClashItemForm = {
  image: File | null;
};
