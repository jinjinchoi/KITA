import { IDetailPageResponseData } from "interface/boardAndReply.interface";

export async function showExistringData(category:string, boardId:number) : Promise<void> {
    try{
        const response = await fetch(`http://localhost:3000/board/${category}/${boardId}`);
        if(!response.ok)
            throw new Error("응답오류");

        const data:IDetailPageResponseData = await response.json();

        // 제목 불러오기
        const titleInput = document.querySelector(".titleRegion-input") as HTMLInputElement;
        if (titleInput) {
            titleInput.value = data.wholeContents.content.boardTitle;
        } else {
            throw new Error("html 요소를 찾지 못했습니다.")
        }

        // 본문 내용
        document.querySelector(".contentRegion-textarea").textContent = data.wholeContents.content.boardContent;

        // 파일 이름
        if(data.wholeContents.content.boardFile)
            document.querySelector(".bottom-fileName").textContent = data.wholeContents.content.boardFile;
        
    } catch(err) {
        console.log("패치 오류", err.message);
    }
}