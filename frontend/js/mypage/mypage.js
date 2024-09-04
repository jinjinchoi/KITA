document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/profile',{
        withCredentials: true});
        
        const user = response.data;
        console.log(response)
      if(user.uprofile){
        document.querySelector('#user_img').src = `http://localhost:3000/${user.uprofile}`;
      }else{
        document.querySelector('#user_img').src =  "../../profile/unknown.jpg"
      }
      document.querySelector('#uid_content').textContent = user.uid;
      document.querySelector('#umessage_content').textContent = '********';
      document.querySelector('#nick_content').textContent = user.unickname;
      document.querySelector('#email_content').textContent = user.uemail;
      document.querySelector('#phone_content').textContent = user.uphone;
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
});

//--------------------------------- 버튼 -------------------------------------

class Btn{
  constructor(){
    this.modifyBtn = document.querySelector('#okBtn')
    this.backBtn = document.querySelector('#cancelBtn')

    this.event()
    this.back()
  }

  event(){
    this.modifyBtn.addEventListener('click', () => {
      location.href = '../mypage/modify.html';
    })
  }

  back(){
    this.backBtn.addEventListener('click', () => {
      location.href = '../../html/category/main.html';
    })
  }
}

const mypageBtn = new Btn();
// ---------------------------------------------------------------------