import { isLogin } from "./loginLogic.isLogin"
import { alreadyLogout } from "./loginLogic.logout";
import { drawMyPageAndLogout } from "./loginLogic.render"

document.addEventListener('DOMContentLoaded', async () => {
    if(await isLogin()) {
        drawMyPageAndLogout();
    } else {
        alreadyLogout();
    }
})