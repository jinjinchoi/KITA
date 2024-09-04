import { ICookieUserInfo } from "interface/cookie.interface";
import { isLogin } from "./loginLogic.isLogin";

let showingAlert : boolean = false

// 쿠키로 유저 정보 받아오기
export async function getUserIdAndNickName() {
    const whetherBeingLogin = await isLogin()
    if(!whetherBeingLogin)
        return
    try {
        const response = await fetch("http://localhost:3000/users/profile", {
            method : 'GET',
            credentials : 'include',
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message}`)
        }

        const data : ICookieUserInfo = await response.json();

        return data;
    } catch (err) {
        if(showingAlert) {
            return;
        } else {
            alert("로그인로직 - 로그인 인증 오류가 발생하였습니다. 다시 로그인 해주세요.")
            console.error("쿠키 유저 정보 획득 오류: ", err.message);
            showingAlert = true;
        }
    }

}