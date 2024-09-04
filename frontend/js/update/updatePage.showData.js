var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function showExistringData(category, boardId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/board/${category}/${boardId}`);
            if (!response.ok)
                throw new Error("응답오류");
            const data = yield response.json();
            const titleInput = document.querySelector(".titleRegion-input");
            if (titleInput) {
                titleInput.value = data.wholeContents.content.boardTitle;
            }
            else {
                throw new Error("html 요소를 찾지 못했습니다.");
            }
            document.querySelector(".contentRegion-textarea").textContent = data.wholeContents.content.boardContent;
            if (data.wholeContents.content.boardFile)
                document.querySelector(".bottom-fileName").textContent = data.wholeContents.content.boardFile;
        }
        catch (err) {
            console.log("패치 오류", err.message);
        }
    });
}
