type VersoFormType = {
  title?: string;
  description?: string;
};

type VersoFormTypeError = {
  title?: string;
  description?: string;
  expires_at?: string;
  image?: string;
};

type VersoType = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  expires_at: string;
  image: string;
  created_at: string;
  versoItems: Array<versoItem>;
  versoComments: Array<versoComment>;
};

type VersoItemForm = {
  image: File | null;
};

type versoItem = {
  id: number;
  count: number;
  image: string;
};
type versoComment = {
  id: number;
  comment: string;
  created_at: string;
};
