var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { colorPainting, removePainting } from "./like.fillButton.js";
export function likeImplement(category, boardId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/like/LikeUpdate/${category}/${boardId}/`, {
                method: "POST",
                credentials: 'include'
            });
            if (!response.ok) {
                if (response.status === 401) {
                    alert("로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.");
                    throw new Error("인증 오류 - 토큰이 유효하지 않습니다.");
                }
                else {
                    throw new Error("리스폰스 응답 오류");
                }
            }
            const responseMesaage = yield response.json();
            if (responseMesaage.message = "좋아요") {
                colorPainting();
            }
            else {
                removePainting();
            }
            window.location.reload();
        }
        catch (err) {
            console.log("좋아요 로직 오류: ", err);
        }
    });
}
