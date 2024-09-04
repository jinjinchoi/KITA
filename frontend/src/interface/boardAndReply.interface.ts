export interface IBoard {
    id:number;
    boardTitle : string;
    boardContent : string;
    boardView: number;
    uid:string;
    unickname:string;
    uprofile:string;
    categories:string;
    boardFile: string | null;
    boardLike:number;
    numberOfComment:number;
    createdAt:string;
    updatedAt:string;
    deletedAt:string | null;
}

export interface IReply {
    id:number,
    uid:string,
    unickname:string,
    uprofile:string,
    boardId:number,
    category:string,
    replyContent:string,
    parentId:number,
    replyFile:string,
    createdAt:string,
    updatedAt:string,
    deletedAt:string,
    replies?:Array<IReply>,
    isDeleted: boolean,
}

// 게시물 목록 응답 인터페이스
export interface IResponseData {
    message: string;
    postList: IBoard[];
}

// 게시물 하나 응답 인터페이스
export interface IDetailPageResponseData {
    message: string;
    wholeContents: IWholeContents;
}

// 게시물 하나 응답 받을때 contents에 들어가는 응답 내용 인터페이스
interface IWholeContents {
    content : IBoard;
    reply: IReply[];
    whetherLike: boolean;
}