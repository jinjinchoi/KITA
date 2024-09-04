import { logoutExecute } from "./loginLogic.logout.js";
export function drawMyPageAndLogout() {
    const myPage = document.querySelector(".banner-login-a");
    myPage.href = "../../html/mypage/mypage.html";
    const myPageSpan = myPage.querySelector('span');
    myPageSpan.innerHTML = "mypage";
    const logoutDiv = document.createElement('div');
    logoutDiv.classList.add("banner-userUI-logout");
    const logoutSpan = document.createElement('span');
    logoutSpan.innerHTML = "Logout";
    logoutDiv.appendChild(logoutSpan);
    myPage.insertAdjacentElement('afterend', logoutDiv);
    logoutDiv.addEventListener('click', () => {
        logoutExecute(logoutDiv, myPageSpan, myPage);
    });
}
