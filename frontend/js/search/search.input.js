document.querySelector(".banner-searchBar-container").addEventListener("submit", (e) => {
    e.preventDefault();
    const inputData = document.querySelector(".banner-search-input");
    const word = inputData.value;
    if (word.trim() === '') {
        alert("검색어를 입력해주세요");
        return;
    }
    window.location.href = `../search/search.html?word=${word}`;
});
