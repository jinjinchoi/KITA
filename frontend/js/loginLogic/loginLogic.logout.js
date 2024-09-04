var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function logoutExecute(logoutDiv, myPageSpan, aTag) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("확인");
        logoutDiv.remove();
        myPageSpan.innerHTML = "Log in";
        aTag.href = "../../html/login/login.html";
        try {
            const response = yield fetch('http://localhost:3000/users/logout/out', {
                method: 'POST',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("리스폰스 응답 에러");
            }
            window.location.reload();
        }
        catch (err) {
            console.log("로그아웃 로직 에러: ", err);
        }
    });
}
export function alreadyLogout() {
    const logutDiv = document.querySelector(".banner-userUI-logout");
    if (!logutDiv)
        return;
    logutDiv.remove();
    const myPageATag = document.querySelector(".banner-login-a");
    myPageATag.href = "./../html/login/login.html";
    const myPageSpan = myPageATag.querySelector('span');
    myPageSpan.innerHTML = "Log in";
}
