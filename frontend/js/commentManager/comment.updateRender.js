var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { updateExecute } from "./comment.updateExecute.js";
export function updateRender(replyId, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUpdate = document.querySelector(".replyUpdateContainer");
        if (existingUpdate) {
            const dataSet = existingUpdate.getAttribute("data-set");
            const hiddenSpan = document.querySelector(`.replyContainer-span[data-set="${dataSet}"]`);
            hiddenSpan.style.display = "block";
            existingUpdate.remove();
        }
        const HTMLSyntex = `
<form class="commentInputContainer-form">
    <textarea class="commentUpdateContainer-textarea" placeholder="Believe Yell" name = "replyContent">${content}</textarea>
    <button type="submit" class="commentInputContainer-updateBtn"> 수정 </button>
</form>
`;
        const replySpan = document.querySelector(`.replyContainer-span[data-set="${replyId}"]`);
        replySpan.style.display = "none";
        const updateDiv = document.createElement("div");
        updateDiv.classList.add("replyUpdateContainer");
        updateDiv.setAttribute("data-set", replyId);
        updateDiv.innerHTML = HTMLSyntex;
        const replyContainer = document.querySelector(`.replyContainer[data-set="${replyId}"]`);
        replyContainer.append(updateDiv);
        updateDiv.addEventListener("submit", (e) => {
            e.preventDefault();
            updateExecute(replyId, e);
        });
    });
}
