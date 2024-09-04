import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty({message : 'Title에 데이터가 존재하지 않습니다.'})
    boardTitle :string;
    @IsNotEmpty({message : "본문에 데이터가 존재하지 않습니다."})
    boardContent : string
    unickname : string;
    uid : string;
    uprofile?:string;
    boardFile?: string;
}
