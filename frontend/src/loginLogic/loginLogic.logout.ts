// 로그아웃시 메세지 변경하고 쿠키 삭제하고 링크 변경하는 함수

export async function logoutExecute(logoutDiv : HTMLDivElement, myPageSpan : HTMLSpanElement, aTag : HTMLAnchorElement) : Promise<void> {
    console.log("확인")
    logoutDiv.remove();
    myPageSpan.innerHTML = "Log in"
    aTag.href = "../../html/login/login.html";
    // 백엔드에서 쿠키 삭제
    try{
        const response = await fetch('http://localhost:3000/users/logout/out', {
            method : 'POST',
            credentials: 'include',
        }) 
        if(!response.ok) {
            throw new Error("리스폰스 응답 에러")
        }
        window.location.reload();
    } catch (err) {
        console.log("로그아웃 로직 에러: ", err)
    }
    
}

export function alreadyLogout() {
    const logutDiv = document.querySelector(".banner-userUI-logout") as HTMLDivElement;
    if(!logutDiv)
        return;
    logutDiv.remove();
    const myPageATag = document.querySelector(".banner-login-a") as HTMLAnchorElement 
    myPageATag.href = "./../html/login/login.html"
        const myPageSpan = myPageATag.querySelector('span') as HTMLSpanElement;
        myPageSpan.innerHTML = "Log in"
}