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
  user: [
    {
      id: '17af78ee-3c30-4ec1-a849-53907e37199d',
      name: 'TEST_USER',
      login: 'test_user',
      password: '1T35t_P@55w0rd',
    },
    {
      id: '927f5a59-88f7-44f5-8c06-d8c0330ca5fc',
      name: 'TEST_USER2',
      login: 'test_user2',
      password: '2T35t_P@55w0rd',
    },
  ],
  board: [],
  task: [],
};
