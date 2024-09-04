
import { deleteComment } from "./comment.delete";
import { renderReplyInputDOM } from "./comment.inputRender";
import { updateRender } from "./comment.updateRender";


// 답글 버튼에 이벤트 리스너 추가
export function addBtnEvent(replyButton : HTMLDivElement) : void {
    replyButton.addEventListener("click", (e)=>{
        const target = e.currentTarget as HTMLDivElement;
        const replyId = target.getAttribute('data-set')
        
        const verifyOpen = document.querySelector(`.replyInputContainer[data-set="${replyId}"]`)
        if(verifyOpen) {
            verifyOpen.remove();
        } else {
            renderReplyInputDOM(replyId);
        }

    })
}

// 수정 버튼에 이벤트 리스너 추가
export function addUpdateEvent(updateBtn : HTMLDivElement, content : string) : void {
    updateBtn.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLDivElement;
        const replyId = target.getAttribute('data-set');

        const verifyOpen = document.querySelector(`.replyUpdateContainer[data-set="${replyId}"]`)

        if(verifyOpen) {
            const text = document.querySelector(`.replyContainer-span[data-set="${replyId}"]`) as HTMLSpanElement;
            text.style.display = "block";
            verifyOpen.remove();
        } else {
            updateRender(replyId, content);
        }
    })
}

// 삭제 버튼에 이벤트 리스너 추가
export function addRemoveEvent(removeBtn : HTMLDivElement ,category : string, boardId : string, replyId : string, uid:string) : void {
    removeBtn.addEventListener("click", () => {
        if(!confirm("정말로 삭제하시겠습니까?"))
            return;
        deleteComment(category, boardId, replyId, uid);

    })
}


