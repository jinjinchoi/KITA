var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { throttle } from "./throttle.js";
import { displayPost } from "./category.render.js";
let offset = 0;
const LIMIT = 10;
function getData(category) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/board/free?limit=${LIMIT}&offset=${offset}`);
            if (!response.ok) {
                throw new Error("응답 에러");
            }
            const responseData = yield response.json();
            const { postList: specifiedPost } = responseData;
            if (specifiedPost.length === 0) {
                window.removeEventListener('scroll', addPost);
                return specifiedPost;
            }
            offset += LIMIT;
            return specifiedPost;
        }
        catch (err) {
            console.log('패치 오류: ', err.message);
        }
        return [];
    });
}
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postInfo = yield getData("free");
        displayPost(postInfo);
    }
    catch (err) {
        console.log(err.message);
    }
}));
let isLoading = false;
function addPost() {
    return __awaiter(this, void 0, void 0, function* () {
        if (isLoading)
            return;
        const pageBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight;
        if (pageBottom) {
            isLoading = true;
            try {
                const postInfo = yield getData("free");
                displayPost(postInfo);
            }
            finally {
                isLoading = false;
            }
        }
    });
}
window.addEventListener('scroll', throttle(addPost, 200));
