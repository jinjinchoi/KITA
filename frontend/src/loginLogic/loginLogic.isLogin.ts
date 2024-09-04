import {IExistCookie} from "../interface/cookie.interface"

// 토큰이 있는지만 확인
export async function isLogin() : Promise<boolean> {
    const response = await fetch('http://localhost:3000/board/Login/cookie/exist', {
        method : 'GET',
        credentials : 'include'
    })
    const responseData : IExistCookie = await response.json();

    return responseData.isLogin;

}