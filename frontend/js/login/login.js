// ------------- 로그인 Input 작용시 버튼색 바꿈 이벤트 -------------------------

class BtnLight{
    constructor() {
        this.idInput = document.querySelector('#uid')
        this.pwInput = document.querySelector('#upw')
        this.loginBtn = document.querySelector('.login_btn')

        this.event()
        this.btnChange()
    }

    event(){
        this.idInput.addEventListener('input', () => this.btnChange());
        this.pwInput.addEventListener('input', () => this.btnChange());
    }

    btnChange(){
        if((this.idInput.value.length >= 6) && (this.pwInput.value.length >= 8)){
            this.loginBtn.classList.add('login_btnOn');
            this.loginBtn.classList.remove('login_btn');
        }else{
            this.loginBtn.classList.remove('login_btnOn');  
            this.loginBtn.classList.add('login_btn');
        }
    }
}
const loginBtn = new BtnLight()

// ----------------------------------------------------------------------------

// -------------------------- 로그인 버튼 클릭 ---------------------------------

class LoginBtn {
    constructor() {
        this.idInput = document.querySelector('#uid')
        this.pwInput = document.querySelector('#upw')
        this.loginBtn = document.querySelector('.login_btn')
        this.error = document.querySelector('#error_message')

        this.event()
    }

    event(){
        this.loginBtn.addEventListener('click', async () => {
        try{
            const response = await axios.post("http://localhost:3000/auth/login",
                { uid: this.idInput.value, upw: this.pwInput.value },
                { withCredentials: true })
            if(( response.status==200 ) || ( response.status==201 )){
                location.href="../../html/category/main.html"
            }
        }catch(err){
            if (err.response && err.response.status === 401) {
                this.error.textContent = '아이디 또는 비밀번호가 일치하지 않습니다.';
            } else {
                this.error.textContent = '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.';
            }
            console.error(err);
        }
        })
    }
}

const clickLogin = new LoginBtn()

// ----------------------------------------------------------------------------