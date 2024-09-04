import { ICookieUserInfo } from "interface/cookie.interface";
import { ILikeResponseMessage } from "../interface/like.interface";
import { colorPainting, removePainting } from "./like.fillButton";

// 좋아요 실행 함수
export async function likeImplement (category : string, boardId : number) : Promise<void> {
    try {
        const response = await fetch(`http://localhost:3000/like/LikeUpdate/${category}/${boardId}/`, {
            method: "POST",
            credentials : 'include'
        })

        if (!response.ok) {
            if (response.status === 401) {
                alert("로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.")
                throw new Error("인증 오류 - 토큰이 유효하지 않습니다.");
            } else {
                throw new Error("리스폰스 응답 오류");
            }
        }

        const responseMesaage : ILikeResponseMessage = await response.json();

        if(responseMesaage.message = "좋아요") {
            colorPainting();
        } else {
            removePainting();
        }

        window.location.reload();


    } catch (err) {
        console.log("좋아요 로직 오류: ", err);
    }
}