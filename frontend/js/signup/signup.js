// ------------------------ ID 중복체크 ------------------------


// const checkBtn = document.querySelector('#id_check');
// const uid = document.querySelector('#uid')
// const checkFalse = document.querySelector('#check_id_false')
// const checkTrue = document.querySelector('#check_id_true')

// checkBtn.addEventListener('click', () => {
//     if((uid.value.length <= 20) && (uid.value.length >= 6)){
//             checkFalse.style.display = 'none'
//             checkTrue.style.display = 'block'
//     }else {
//         checkTrue.style.display = 'none'
//         checkFalse.style.display = 'block'
//     }
// })


class Check{
    constructor(){
        this.checkBtn = document.querySelector('#id_check')
        this.uid = document.querySelector('#uid')
        this.checkFalse = document.querySelector('#check_id_false')
        this.checkTrue = document.querySelector('#check_id_true')
        this.reg = /^[A-Za-z0-9]{6,20}$/;

        this.event()
    }

    event(){
        this.checkBtn.addEventListener('click', async () => {
            try{
                const userId = this.uid.value
                console.log(userId)
                const userObj = await axios.post("http://localhost:3000/users/signup/idcheck", {},{ headers: {
                    'uid' : userId,
                }})
                console.log(userObj.data.uid)
                console.log(userObj)
                if(this.uid.value !== userObj.data.uid){
                    if(this.reg.test(this.uid.value)){
                        this.checkFalse.style.display = 'none'
                        this.checkTrue.style.display = 'block'
                    }else{
                        this.checkTrue.style.display = 'none'
                        this.checkFalse.style.display = 'block'
                    }
                }else{
                    this.checkTrue.style.display = 'none'
                    this.checkFalse.style.display = 'block'
                }
            }catch(error){

            }
        })
    }
}

const idCheck = new Check();
// -----------------------------------------------------------------

// --------------------------- 가입 취소 --------------------------


// const signupCancel = document.querySelector('#signup_btn_cancel');

// signupCancel.addEventListener('click', () => {
//     if(confirm('취소하시겠습니까?') == true){
//         window.location.href = '../login/login.html'; 
//     }
// })


class SignupCancel{
    constructor(){
        this.cancel = document.querySelector('#signup_btn_cancel')

        this.event()
    }

    event(){
        this.cancel.addEventListener('click', () => {
            if(confirm('취소하시겠습니까?') == true){
                window.location.href = '../../html/login/login.html'; 
            }
        })
    }
}

const cancelBtn = new SignupCancel();
// -------------------------------------------------------------------

// --------------------- 가입하기 ID중복체크 --------------------------
class SignupCheck{
    constructor(){
        this.checkTrue = document.querySelector('#check_id_true')
        this.signupBtn = document.querySelector('#signup_btn')
        this.idInput = document.querySelector('#uid')
        this.pwInput = document.querySelector('#upw')
        this.pwInput2 = document.querySelector('#check_upw')
        this.nickInput = document.querySelector('#unickname')
        this.emailInput = document.querySelector('#uemail')
        this.phoneInput = document.querySelector('#uphone')

        this.nickReg = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
        this.emailReg =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        this.phoneReg = /^\d{3}-?\d{3,4}-?\d{4}$/;
        this.pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/;

        this.event()
    }
    
    event(){
        this.signupBtn.addEventListener('click',async () => {
            console.log('확인용')
            if(this.checkTrue.style.display !== 'block'){
                alert('아이디 중복확인을 해주세요.')
            }else if((this.pwInput.value == '') || (this.pwInput2.value == '') || (this.nickInput.value == '') || (this.emailInput.value == '') || (this.phoneInput.value == '')){
                alert('빈칸이 존재합니다.')
            }else if(!this.nickReg.test(this.nickInput.value)){
                alert('닉네임이 조건에 맞지 않습니다.')
            }else if(!this.pwReg.test(this.pwInput.value)){
                alert('비밀번호가 조건에 맞지 않습니다.')
            }else if(this.pwInput.value !== this.pwInput2.value){
                alert('비밀번호가 일치하지 않습니다.')
            }else if(!this.emailReg.test(this.emailInput.value)){
                alert('이메일을 다시 확인해주세요.')
            }else if(!this.phoneReg.test(this.phoneInput.value)){
                alert('휴대폰 번호를 다시 입력해주세요.')
            }else if((this.checkTrue.style.display === 'block') && (this.pwReg.test(this.pwInput.value)) && (this.pwInput.value === this.pwInput2.value) && (this.nickReg.test(this.nickInput.value)) && (this.emailReg.test(this.emailInput.value)) && (this.phoneReg.test(this.phoneInput.value))){
                try{
                    console.log("확인")
                    await axios.post("http://localhost:3000/users/signup",{uid:this.idInput.value, unickname:this.nickInput.value, upw:this.pwInput.value, uemail:this.emailInput.value, uphone:this.phoneInput.value});
                    console.log("확인")
                    alert('회원가입에 성공했습니다.')
                    location.href = '../login/login.html'
                }catch(error){
                    console.log('error', error.response?.data?.message)
                    alert(`회원가입에 실패했습니다: ${error.response?.data?.message || error.message}` )
                }
            }
        })
    }
}

const signupBtn = new SignupCheck();

// -------------------------------------------------------------------