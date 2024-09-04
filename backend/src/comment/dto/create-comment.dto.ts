import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty({message : "댓글 내용이 존재하지 않습니다."})
    replyContent: string;
    uid?: string;
    unickname?: string;
    uprofile?:string;
    parentId?: number;
    replyFile?: string;
}