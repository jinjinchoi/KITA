import { logoutExecute } from "./loginLogic.logout";

export function drawMyPageAndLogout () {
    const myPage = document.querySelector(".banner-login-a") as HTMLAnchorElement 
        myPage.href = "../../html/mypage/mypage.html"
        const myPageSpan = myPage.querySelector('span') as HTMLSpanElement;
        myPageSpan.innerHTML = "mypage"

        const logoutDiv = document.createElement('div') as HTMLDivElement;
        logoutDiv.classList.add("banner-userUI-logout")
        const logoutSpan = document.createElement('span') as HTMLSpanElement;
        logoutSpan.innerHTML = "Logout"

        logoutDiv.appendChild(logoutSpan);
        myPage.insertAdjacentElement('afterend', logoutDiv);

        // 로그아웃 기능 구현
        logoutDiv.addEventListener('click', () => {
            logoutExecute(logoutDiv, myPageSpan, myPage)
        })
        
}