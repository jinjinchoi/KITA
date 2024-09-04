
// 업데이트창 그리기

import { updateExecute } from "./comment.updateExecute";

export async function updateRender(replyId : string, content : string) {

    // 다른 곳에 업데이트 창이 열려있으면 닫기
    const existingUpdate = document.querySelector(".replyUpdateContainer") as HTMLDivElement;
    if(existingUpdate) {
        const dataSet = existingUpdate.getAttribute("data-set");
        const hiddenSpan = document.querySelector(`.replyContainer-span[data-set="${dataSet}"]`) as HTMLSpanElement;
        hiddenSpan.style.display = "block";
        existingUpdate.remove();
    }

const HTMLSyntex : string =
`
<form class="commentInputContainer-form">
    <textarea class="commentUpdateContainer-textarea" placeholder="Believe Yell" name = "replyContent">${content}</textarea>
    <button type="submit" class="commentInputContainer-updateBtn"> 수정 </button>
</form>
` 
    
    // 기존에 존재하는 span 태그 안보이게
    const replySpan = document.querySelector(`.replyContainer-span[data-set="${replyId}"]`) as HTMLSpanElement
    replySpan.style.display = "none";

    const updateDiv = document.createElement("div");
    updateDiv.classList.add("replyUpdateContainer");
    updateDiv.setAttribute("data-set", replyId);

    updateDiv.innerHTML = HTMLSyntex;

   


    const replyContainer = document.querySelector(`.replyContainer[data-set="${replyId}"]`);
    replyContainer.append(updateDiv);
    
    // 수정 submit 이벤트 추가
    updateDiv.addEventListener("submit", (e : SubmitEvent) => {
        e.preventDefault();
        updateExecute(replyId, e);
    })

}