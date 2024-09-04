export interface IBoard {
    id: number;
    boardTitle: string;
    boardContent: string;
    boardView: number;
    uid: string;
    unickname: string;
    categories: string;
    boardFile: string | null;
    boardLike: number;
    numberOfComment: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }