var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let loadedAllContents = false;
let offset = 0;
const LIMIT = 10;
export function getSpecifiableData(word) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (loadedAllContents)
                return;
            const response = yield fetch(`http://localhost:3000/board/logic/search/implement?word=${word}&limit=${LIMIT}&offset=${offset}`);
            if (!response.ok) {
                throw new Error("응답 에러");
            }
            const responseData = yield response.json();
            const { postList: specifiedPost } = responseData;
            console.log("offset =", offset);
            if (specifiedPost.length === 0) {
                loadedAllContents = true;
                return [];
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
