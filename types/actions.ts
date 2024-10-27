export type AuthState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    auth?: string[];
  };
  message?: string | null;
};
export interface ActionsActionState {
  errors?: {
    name?: string[];
  };
  message?: string | null;
}

export interface NewArticleState {
  error?: string;
}
