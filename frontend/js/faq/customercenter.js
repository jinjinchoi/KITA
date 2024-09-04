// 검색 url
const currentURL = window.location.href;
const faqSearch = new URL(currentURL).searchParams.get("faqSearch");
// 글 전체 목록 페이지 보여주기
const Data = async () => {
  if(!faqSearch){
    const res = await axios.get('http://localhost:3000/faq')
    return res;
  }
  // 검색어가 있는 데이터 가져오기
  const res = await axios.get(`http://localhost:3000/faq/q`,
    {params : {q : faqSearch}}
  )
  return res;
}

const faqDataFn = faqData(Data());

async function faqData(res){
  const { data } = await res;

  for (let i = 0; i < data.length; i++) {
    let { faqTitle, faqContent, id } = data[i];

    const faqBoard = document.querySelector('.faq-board');

    const listCreate = document.createElement("div");
    const h3title = document.createElement("h3");
    const pcontent = document.createElement("p");
    const deleteBtn = document.createElement("button");
    const modifyBtn = document.createElement('a')

    listCreate.classList.add("faq-list");
    h3title.classList.add("faq-title");
    pcontent.classList.add("faq-content");
    deleteBtn.classList.add("deleteBtn");

    h3title.innerHTML = data[i].faqTitle;
    pcontent.innerHTML = `${data[i].faqContent} &nbsp  &nbsp`;
    deleteBtn.innerHTML = "삭제";
    modifyBtn.innerHTML = "수정";

    modifyBtn.href = `../../html/faq/adminfaq.html?modify=${data[i].id}`
    
    // dataset.id 에 id값 부여
    deleteBtn.dataset.id = data[i].id;

    pcontent.append(modifyBtn, deleteBtn)
    listCreate.append(h3title, pcontent);
    faqBoard.append(listCreate);
  }
  // 글 검색기능
  const searchFrm = document.querySelector("#searchFrm");
  const {faqSearch} = searchFrm;

  // 검색 요청
  searchFrm.onsubmit = async (e) => {
    if(faqSearch.value === ""){alert("검색어를 입력해주세요."); e.preventDefault(); return;}
  }

  // 삭제 버튼
  const deleteBtn = document.querySelectorAll(".deleteBtn");  
  const deleteBtnArray = [...deleteBtn];

  // 삭제 버튼 배열로 만들기 위함
  for( const del of deleteBtnArray){
    // 클릭시 삭제
    del.onclick = function(){
      // id 인덱스 값 가져오기
      const id = this.dataset.id
      
      // 글 삭제 확인 여부
      const deleteConfirm = confirm("글을 삭제 하시겠습니까");
      if(deleteConfirm){
        try {
          axios.delete(`http://localhost:3000/faq/${id}`)
          .then((res)=> window.location.reload()) // 삭제 후 새로고침 재요청
          .catch((err) => console.log(err)) 
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
  
  // 글 배열 반환
  const faqBoard = document.querySelectorAll('.faq-board > .faq-list');
  const faqBoard_h3 = document.querySelectorAll('.faq-board > .faq-list > h3');
  const faqBoardArray = Array.from(faqBoard);
  
  for(faq of faqBoard_h3){
    faq.onclick = (e) => {
      const div = e.target.parentElement;
      if(div.offsetHeight == 40){
        div.style.height = `max-content`
      } else {
        div.style.height = "38px"
      }
    }
  }
  
  return faqBoardArray;
}

// 페이지 네이션
// 페이지 글번호 생성

const pageNation = document.querySelector(".page-nation");
const page_ol = document.querySelector(".page-nation > ol");


// 버튼 생성
// 페이지네이션 화살표
let pageIndex = 0;
let pageViewIndex = 0;

// 전체 글 수, 전체 보여줄 글 갯수, 보여줄 페이지 갯수
async function pageNationData(){
  const res = await Data();

  const totalBoardData = res.data.length;

  const viewListData = 5; // 보여줄 글 개수
  const totalViewPage = Math.ceil(totalBoardData / viewListData); // 전체 페이지

  displayRow(0);

  // 클릭시 보여줄 페이지
  const page_list = pageNationInit(totalViewPage, pageIndex);
  // 페이지 처음 체크
  page_list[0].classList.add('page-checked');
  page_list[0].classList.remove('page-not-checked');

  for (const pageBtn of page_list) {
    // 체크되지 않는 페이지 초기화
    for (let i = 1; i < page_list.length; i++) {
      page_list[i].classList.add('page-not-checked');
    }

    // A태그 클릭시 게시물 이동
    pageBtn.onclick = (e) => {
      e.preventDefault();

      // 보여줄 list
      const pageNum = e.target.innerHTML - 1;
      displayRow(pageNum);

      // 버튼 클릭시 클래스 추가 삭제
      for (let i = 0; i < page_list.length; i++) {
        page_list[i].classList.remove('page-checked');
        page_list[i].classList.add('page-not-checked');
      }
      e.target.classList.remove('page-not-checked');
      e.target.classList.add('page-checked');
    }
  }
  return res;
}

// 글 내용 보여주기
async function displayRow(idx){
  const res = await faqDataFn;
  const start = idx * 5;
  const end =  start + 5;

  // 전체 글 사라지게 만들기
  for (const list of res) {
    list.style.display = "none";
  }

  // 게시물 보여주는 부분
  const viewList = res.slice(start, end);

  for (const list of viewList) {
    list.style.display = "block";
  }
}

function pageNationInit(totalViewPage, idx){

  for (let i = 1; i <= totalViewPage; i++) {
    const page_li = document.createElement("li");
    const page_a = document.createElement("a");
    page_a.innerHTML = i;

    page_li.append(page_a);
    page_ol.append(page_li);
  }

  const page_checked_li = document.querySelectorAll(".page-nation > ol > li");
  const page_li_array = [...page_checked_li]
  const page_checked = document.querySelectorAll(".page-nation > ol > li > a");
  const pageArray = [...page_checked];
  
  for(let i = 0; i < page_li_array.length; i++){
    page_li_array[i].style.display = "none";
  }

  // 글 페이지 생성
  // 다음 이전 화살표
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  
  // 페이지 개수
  let maxPage = 3;
  if(totalViewPage <= 3){
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
    if(totalViewPage <= 2){
      maxPage = 1;
    } else if(totalViewPage <= 1){
      maxPage = 0;
    }
  }
  
  let start = idx * maxPage;
  let end = maxPage + start;

  const viewPage = Math.ceil(pageArray.length / 3);

  let viewNum = page_li_array.slice(start, end);

  for (const num of viewNum) {
    num.style.display = 'block'
  }
  prevBtn.style.display = "none";
  nextBtn.onclick = function(e){
    prevBtn.style.display = "flex";
    pageIndex++
    let pageActive = pageViewIndex += 3
    displayRow(pageActive);
    pageArray.forEach((item, index) => {
      item.classList.remove("page-checked");
      item.classList.add("page-not-checked");
    });
    pageArray[pageActive].classList.remove("page-not-checked");
    pageArray[pageActive].classList.add("page-checked");
    
    let start = pageIndex * 3;
    let end = 3 + start;

    for(let i = 0; i < page_li_array.length; i++){
      page_li_array[i].style.display = "none";
    }
    let viewNum = page_li_array.slice(start, end);
    for (const num of viewNum) {
      num.style.display = 'block'
    }
    if(pageIndex === viewPage - 1){
      e.target.style.display = "none";
    }
  }

  prevBtn.onclick = function(e){
    pageIndex--
    let start = pageIndex * 3;
    let end = 3 + start;
    let pageActive = pageViewIndex -= 3
    displayRow(pageActive);

    pageArray.forEach((item, index) => {
      item.classList.remove("page-checked");
      item.classList.add("page-not-checked");
    });
    pageArray[pageActive].classList.remove("page-not-checked");
    pageArray[pageActive].classList.add("page-checked");

    for(let i = 0; i < page_li_array.length; i++){
      page_li_array[i].style.display = "none";
    }
    let viewNum = page_li_array.slice(start, end);
    for (const num of viewNum) {
      num.style.display = 'block'
    }
    if(pageIndex === 0){
      nextBtn.style.display = "flex"; 
      e.target.style.display = "none";
    }
  }
  return pageArray; // 페이지 버튼 반환
}

// 페이지네이션
pageNationData();