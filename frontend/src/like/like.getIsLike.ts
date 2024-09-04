import { getUserIdAndNickName } from "../loginLogic/loginLogic.getUserInfo";
import { ILike } from "../interface/like.interface"
import { ICookieUserInfo } from "interface/cookie.interface";

// 좋아요 했는지 알아보자
export async function DoYouLike(boardId: number, category: string): Promise<boolean> {
    try {
        const userinfo : ICookieUserInfo = await getUserIdAndNickName();
        if(!userinfo){
            return;
        }
        const resonse = await fetch(`http://localhost:3000/like/whetherLike/${category}/${boardId}`, {
            method: 'GET',
            credentials : 'include',
        })

        if(!resonse.ok)
            throw new Error("좋아요 GET 로직 오류");

        const resonseMessage: ILike = await resonse.json();

        return resonseMessage.isLike;
    } catch (err) {
        console.log("좋아요 정보 획득 오류 : ", err) 
    }
}