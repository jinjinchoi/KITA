var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isLogin } from "../loginLogic/loginLogic.isLogin.js";
document.querySelector(".commentInputContainer-form").addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const whetherBeingLogin = yield isLogin();
    if (!whetherBeingLogin) {
        alert("로그인을 해주세요");
        return;
    }
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const id = params.get('id');
    const formData = new FormData(e.target);
    const replyData = formData.get('replyContent');
    if (replyData.trim() === '') {
        alert('댓글 내용을 입력해주세요');
        return;
    }
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    try {
        const response = yield fetch(`http://localhost:3000/board/${category}/${id}/replyCreate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
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
        else {
            window.location.reload();
        }
    }
    catch (err) {
        console.log("댓글 생성 로직 오류: ", err);
    }
}));
