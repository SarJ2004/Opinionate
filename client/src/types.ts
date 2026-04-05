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
  opinionItems: Array<opinionItem>;
  opinionComments: Array<opinionComment>;
};

type OpinionItemForm = {
  image: File | null;
};

type opinionItem = {
  id: number;
  count: number;
  image: string;
};
type opinionComment = {
  id: number;
  comment: string;
  created_at: string;
};
