var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getSpecifiableData } from "./search.getdata.js";
import { displayPost } from "./search.render.js";
import { throttle } from "../category/throttle.js";
const params = new URLSearchParams(window.location.search);
const searchedWord = params.get('word');
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    if (searchedWord == null)
        return;
    const postList = yield getSpecifiableData(searchedWord);
    displayPost(postList);
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
                const postList = yield getSpecifiableData(searchedWord);
                if (postList) {
                    displayPost(postList);
                }
            }
            finally {
                isLoading = false;
            }
        }
    });
}
window.addEventListener('scroll', throttle(addPost, 200));
