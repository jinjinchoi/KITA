import { sendReply } from "./comment.replyCreate.js";
export function renderReplyInputDOM(replyID) {
    const HTMLSyntx = `
<form class="replyInputContainer-form" data-set="${replyID}">
    <textarea class="commentInputContainer-textarea" placeholder="Believe Dream" name = "replyContent"></textarea>
    <button type="submit" class="commentInputContainer-submitBtn"> 작성 </button>
</form>
`;
    const inputDiv = document.createElement("div");
    inputDiv.classList.add('replyInputContainer');
    inputDiv.setAttribute('data-set', replyID);
    inputDiv.innerHTML = HTMLSyntx;
    const existingInputDiv = document.querySelector(".replyInputContainer");
    if (existingInputDiv) {
        existingInputDiv.remove();
    }
    document.querySelector(`.commentContainer-frofileAndContent[data-set="${replyID}"]`).insertAdjacentElement('afterend', inputDiv);
    inputDiv.addEventListener('submit', (e) => {
        sendReply(e, replyID);
    });
}
