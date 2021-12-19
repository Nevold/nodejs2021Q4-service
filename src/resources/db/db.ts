interface Repo {
  user?: Array<{
    id: string;
    name: string;
    login: string;
    password: string;
  }>;
  board?: Array<{
    id: string;
    title: string;
    columns: Array<{ id: string; title: string; order: number }>;
  }>;
  task?: Array<{
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string | null;
    columnId: string | null;
  }>;
}
export const items: Repo = {
  user: [],
  board: [],
  task: [],
};
