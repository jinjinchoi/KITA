var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData } from "./detailPage.getData.js";
import { drawPostRegion } from "./detailPage.post.show.js";
import { drawComment } from "./detailPage.reply.show.js";
import { DoYouLike } from "../like/like.getIsLike.js";
import { colorPainting, removePainting } from "../like/like.fillButton.js";
import { isLogin } from "../loginLogic/loginLogic.isLogin.js";
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const id = params.get('id');
    const parsedId = Number(id);
    try {
        const detailPageData = yield getData(category, parsedId);
        drawPostRegion(detailPageData.wholeContents.content);
        drawComment(detailPageData.wholeContents.reply, false);
        if (yield isLogin()) {
            const checkIsLike = yield DoYouLike(parsedId, category);
            if (checkIsLike) {
                colorPainting();
            }
            else {
                removePainting();
            }
        }
        const hash = window.location.hash;
        if (hash) {
            const hashName = hash.substring(1);
            const hashElement = document.querySelector(`.${hashName}`);
            hashElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.location.hash = '';
        }
    }
    catch (err) {
        console.log("detailPage controller Error: ", err);
    }
    const toView = document.querySelector("#topBar-toView");
    toView.href = `../category/${category}.html`;
    document.querySelector("#toBar-toWrite").addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (yield isLogin()) {
            window.location.href = `../write/${category}BoardWrite.html`;
        }
        else {
            alert("로그인을 해주세요");
        }
    }));
}));
