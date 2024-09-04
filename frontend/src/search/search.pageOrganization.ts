import { IBoard } from "interface/boardAndReply.interface";
import { getSpecifiableData } from "./search.getdata";
import { displayPost } from "./search.render";
import { throttle } from "../category/throttle";

const params = new URLSearchParams(window.location.search);
const searchedWord : string | null = params.get('word');

// 로드시
document.addEventListener("DOMContentLoaded", async () => {
    // 쿼리에서 검색어 가져옴

    if(searchedWord == null)
        return;

    // 검색어 기반으로 데이터 가져옴
    const postList : IBoard[] = await getSpecifiableData(searchedWord);
    // 게시판 그리기
    displayPost(postList);

})

// 스크롤 시

let isLoading = false;

async function addPost () {
    if (isLoading) return; 
    const pageBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight
    if(pageBottom) {
        isLoading = true;
        try {
            const postList:IBoard[] = await getSpecifiableData(searchedWord);
            if(postList) {
                displayPost(postList);
            }
        } finally {
            isLoading = false;
        }
    }
}


window.addEventListener('scroll', throttle(addPost, 200))