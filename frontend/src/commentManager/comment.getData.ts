import { IReply } from "interface/boardAndReply.interface";

export async function getReplyContent (boardId : number, category : string ,limit : number, offset : number) {
    try {
        const response = await fetch(`http://localhost:3000/board/${category}/${boardId}/getReply`);
        if(!response.ok) {
            throw new Error('리스폰스 응답 에러');
        }

        const replyData : IReply = await response.json();
        return replyData;

    } catch (err) {
        alert("댓글 조회 오류 발생")
        console.log("댓글 get 로직 오류: ", err)
    }
}