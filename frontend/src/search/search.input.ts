// 검색창 입력시 이동하게 검색페이지로

document.querySelector(".banner-searchBar-container").addEventListener("submit", (e : SubmitEvent) => {
    e.preventDefault();
    
    const inputData = document.querySelector(".banner-search-input") as HTMLInputElement
    const word : string = inputData.value
    if(word.trim() === '') {
        alert("검색어를 입력해주세요")
        return;
    }

    window.location.href = `../search/search.html?word=${word}`;
})