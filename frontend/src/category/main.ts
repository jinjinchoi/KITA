import { IBoard, IResponseData } from "interface/boardAndReply.interface"
import { throttle } from "./throttle";
import { displayPost } from "./category.render";

let offset : number = 0;
const LIMIT : number = 10;

// 게시물 요청하는 함수
async function getData(): Promise<IBoard[]> {
    try {
        console.log(`http://localhost:3000/board?limit=${LIMIT}&offset=${offset}`)
        const response = await fetch(`http://localhost:3000/board?limit=${LIMIT}&offset=${offset}`);
        if(!response.ok) {
            throw new Error("응답 에러")
        }

        const responseData : IResponseData  = await response.json();
        const { postList }  = responseData;

        if(postList.length === 0) {
            window.removeEventListener('scroll', addPost)
            return postList;
        }

        offset += LIMIT;

        return postList;
    } catch (err) {
        console.log('패치 오류: ', err.message)
    }
    return [];
}


// 페이지 로딩 시
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const postInfo:IBoard[] = await getData();
        displayPost(postInfo);
    } catch(err) {
        console.log(err.message);
    }

})

// 스크롤시 이벤트 추가

let isLoading = false;


async function addPost () {
    if (isLoading) return; 
    const pageBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight
    if(pageBottom) {
        isLoading = true;
        try {
            const postInfo:IBoard[] = await getData();
            displayPost(postInfo);
        } finally {
            isLoading = false;
        }
    }
}

window.addEventListener('scroll', throttle(addPost, 200));