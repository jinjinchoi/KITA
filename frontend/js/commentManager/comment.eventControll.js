import { deleteComment } from "./comment.delete.js";
import { renderReplyInputDOM } from "./comment.inputRender.js";
import { updateRender } from "./comment.updateRender.js";
export function addBtnEvent(replyButton) {
    replyButton.addEventListener("click", (e) => {
        const target = e.currentTarget;
        const replyId = target.getAttribute('data-set');
        const verifyOpen = document.querySelector(`.replyInputContainer[data-set="${replyId}"]`);
        if (verifyOpen) {
            verifyOpen.remove();
        }
        else {
            renderReplyInputDOM(replyId);
        }
    });
}
export function addUpdateEvent(updateBtn, content) {
    updateBtn.addEventListener("click", (e) => {
        const target = e.currentTarget;
        const replyId = target.getAttribute('data-set');
        const verifyOpen = document.querySelector(`.replyUpdateContainer[data-set="${replyId}"]`);
        if (verifyOpen) {
            const text = document.querySelector(`.replyContainer-span[data-set="${replyId}"]`);
            text.style.display = "block";
            verifyOpen.remove();
        }
        else {
            updateRender(replyId, content);
        }
    });
}
export function addRemoveEvent(removeBtn, category, boardId, replyId, uid) {
    removeBtn.addEventListener("click", () => {
        if (!confirm("정말로 삭제하시겠습니까?"))
            return;
        deleteComment(category, boardId, replyId, uid);
    });
}
