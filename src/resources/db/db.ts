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
    // {
    //   id: '17af78ee-3c30-4ec1-a849-53907e37199d',
    //   name: 'TEST_USER',
    //   login: 'test_user',
    //   password: '1T35t_P@55w0rd',
    // },
    // {
    //   id: '927f5a59-88f7-44f5-8c06-d8c0330ca5fc',
    //   name: 'TEST_USER2',
    //   login: 'test_user2',
    //   password: '2T35t_P@55w0rd',
    // },
  ],
  board: [
    // {
    //   id: '7841d0a8-f893-4a8a-a8e7-cb71e12181c3',
    //   title: 'Autotest board111',
    //   columns: [
    //     {
    //       id: '7367e3f7-dbcb-488a-8669-36e4b7224506',
    //       title: 'Backlog',
    //       order: 1,
    //     },
    //     {
    //       id: 'ff03c88e-aae2-40e4-b933-555ea79a1634',
    //       title: 'Sprint',
    //       order: 2,
    //     },
    //     ],
    //   },
    //   {
    //     id: '7841d0a8-f893-4a8a-a8e7-cb71e12181c2',
    //     title: 'Autotest board222',
    //     columns: [
    //       {
    //         id: '7367e3f7-dbcb-488a-8669-36e4b7224505',
    //         title: 'Backlog222',
    //         order: 1,
    //       },
    //       {
    //         id: '7367e3f7-dbcb-488a-8669-36e4b7224501',
    //         title: 'Sprint222',
    //         order: 2,
    //       },
    //     ],
    //   },
  ],
  task: [
    //   {
    //     id: '7367e3f7-dbcb-489a-8669-36e4b7224509',
    //     title: 'Autotest task111',
    //     order: 0,
    //     description: 'task111task111task111',
    //     userId: '17af78ee-3c30-4ec1-a849-53907e37199d',
    //     boardId: '7841d0a8-f893-4a8a-a8e7-cb71e12181c3',
    //     columnId: '7367e3f7-dbcb-488a-8669-36e4b7224506',
    //   },
    //   {
    //     id: '8367e8f7-dbcb-489a-8669-36e4b7224509',
    //     title: 'Autotest task222',
    //     order: 0,
    //     description: 'task222task222task222',
    //     userId: '17af78ee-3c30-4ec1-a849-53907e37199d',
    //     boardId: '7841d0a8-f893-4a8a-a8e7-cb71e12181c3',
    //     columnId: '7367e3f7-dbcb-488a-8669-36e4b7224506',
    //   },
  ],
};
