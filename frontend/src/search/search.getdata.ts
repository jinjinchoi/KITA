import { IResponseData } from "../interface/boardAndReply.interface";

let loadedAllContents = false

let offset : number = 0;
const LIMIT : number = 10;

export async function getSpecifiableData (word : string) {

    try {
        if(loadedAllContents)
            return;

        const response = await fetch(`http://localhost:3000/board/logic/search/implement?word=${word}&limit=${LIMIT}&offset=${offset}`);
        if(!response.ok) {
            throw new Error("응답 에러")
        }
        const responseData : IResponseData  = await response.json();
        const { postList : specifiedPost }  = responseData;
        console.log("offset =", offset);

        if(specifiedPost.length === 0) {
            loadedAllContents = true;
            return [];
        }

        offset += LIMIT;

        return specifiedPost;
    } catch (err) {
        console.log('패치 오류: ', err.message)
    }
    return [];
}