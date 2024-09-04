import { IDetailPageResponseData } from "interface/boardAndReply.interface";

// 백엔드에서 상세 페이지 가져오는 함수
export async function getData(category:string, boardId:number) : Promise<IDetailPageResponseData> | null {
    try {
        const response = await fetch(`http://localhost:3000/board/${category}/${boardId}`);
        if (!response.ok)
            throw new Error("응답오류")

        const postData: IDetailPageResponseData = await response.json(); 
        return postData;
    } catch (err) {
        console.log("fetch 오류: ", err.message);
    }
    return null;
}

  