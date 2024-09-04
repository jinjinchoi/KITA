// 수정페이지로 이동하는 파라미터
const locationURL = location.href;
const searchParams = new URL(locationURL).searchParams;
const modifyParam = searchParams.get('modify')

// 수정 페이지 데이터 받기
function faqModifyView(){
  // 파라미터 값이 있으면 수정페이지 함수 실행
  if(modifyParam){
    return axios.get('http://localhost:3000/faq/adminfaq/modify',
      {params : {modify : modifyParam}}
    )
    .then((res) => {
      console.log("파라미터 값이 들어가겠지?")
      const {faqTitle, faqContent } = res.data
      viewModifyInput(faqTitle, faqContent)
    }).catch((err) => {
      console.log("파라미터 값 안 들어갔어")
    })
  } else {
    let title;
    let content;
    viewModifyInput(title, content);
  }
}

// submit Event 발생시 빈값 허용 안함
const faqFrm = document.getElementById("faqFrm");
const { faqTitle, faqContent } = faqFrm;

faqFrm.onsubmit = (e) => {
  if(!faqTitle.value){
    alert("제목을 입력해주세요");
    e.preventDefault();
    return;
  }
  if(!faqContent.value){
    alert("본문을 입력해주세요");
    e.preventDefault();
    return;
  }
  if(!confirm("글을 등록하시겠습니까")){
    e.preventDefault();
  }
}

// 수정페이지로 넘어갈 때 form 숨김
const modifyWrap = document.getElementById("modifyWrap");
// 수정할 input 값
const modifyTitle = document.getElementById("modifyTitle");
const modifyContent = document.getElementById("modifyContent");

function viewModifyInput(title, content){
  // 수정페이지 (parameter 값이 있으면)면 수정 태그 생성
  // form 태그 숨김
  if(modifyParam){
    faqFrm.style.display = "none";
    modifyWrap.style.display = "block";

    modifyTitle.value = title;
    modifyContent.value = content;
  } else {
    faqFrm.style.display = "block";
    modifyWrap.style.display = "none";
  }
}

faqModifyView();

// 버튼 클릭 시 수정을 해주는 함수
const modifyBtn = document.getElementById("modifyBtn");
modifyBtn.onclick = () => {
  if(!modifyTitle.value){
    alert("제목을 입력해주세요");
    return;
  }
  if(!modifyContent.value){
    alert("본문을 입력해주세요");
    return;
  }
  if(!confirm("글을 등록하시겠습니까")) return;
  axios.put(`http://127.0.0.1:3000/faq/adminfaq/${modifyParam}`,
    {
      faqTitle: modifyTitle.value,
      faqContent: modifyContent.value
    }
  )
  .then((res) => {
    console.log(res.data)
    location.href = "../../html/faq/customercenter.html"
  })
  .catch((err) => {
    console.log(err, "글 수정이 안 됐어")
  })
}

// // 글 작성, 수정 취소
const cancelBtn = document.querySelectorAll(".cancelBtn");
const cancelBtnArray = [...cancelBtn];
for (const cancel of cancelBtnArray) {
  cancel.onclick = (e) => {
    e.preventDefault();
  
    if(confirm("글 등록을 취소하시겠습니까?")){
      location.href = "../../html/faq/customercenter.html";
    }
  }
}