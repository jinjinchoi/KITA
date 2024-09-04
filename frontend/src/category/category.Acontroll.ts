import { isLogin } from "../loginLogic/loginLogic.isLogin";


document.querySelector("#topBar-writeBtn").addEventListener('click', async function (e) {
    e.preventDefault();
    if(!await isLogin()) {
        alert("로그인을 해주세요");
        return;
    } else {
        const anchorElement = this as HTMLAnchorElement
        window.location.href = anchorElement.href;
    }
})