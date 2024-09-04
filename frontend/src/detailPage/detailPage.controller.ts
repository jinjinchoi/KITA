import { IDetailPageResponseData, IReply } from "interface/boardAndReply.interface";
import { getData } from "./detailPage.getData";
import { drawPostRegion } from "./detailPage.post.show";
import { drawComment } from "./detailPage.reply.show";
import { DoYouLike } from "../like/like.getIsLike";
import { colorPainting, removePainting } from "../like/like.fillButton";
import { isLogin } from "../loginLogic/loginLogic.isLogin";

document.addEventListener("DOMContentLoaded", async () => {
    // 파라미터값 불러오기
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const id = params.get('id');
    const parsedId : number = Number(id);

    try {
        const detailPageData : IDetailPageResponseData = await getData(category, parsedId);
        drawPostRegion(detailPageData.wholeContents.content);
        drawComment(detailPageData.wholeContents.reply, false);

        // 좋아요 색칠하기
        if(await isLogin()) {
        const checkIsLike : boolean = await DoYouLike(parsedId, category);
        if(checkIsLike) {
            colorPainting();
        }
        else {
            removePainting();
        }
    }

         // 해시값 불러오기
        const hash = window.location.hash;
        if (hash) {
            const hashName = hash.substring(1);
            const hashElement = document.querySelector(`.${hashName}`)
            hashElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.location.hash = ''
        }

    } catch(err) {
        console.log("detailPage controller Error: ", err);
    }
    
    // 상단 to게시물 버튼 활성화
    const toView = document.querySelector("#topBar-toView") as HTMLAnchorElement;
    toView.href = `../category/${category}.html`;

    // 상단 to작성 버튼 활성화
    document.querySelector("#toBar-toWrite").addEventListener('click', async (e) => {
        e.preventDefault();
        if(await isLogin()) {
            window.location.href = `../write/${category}BoardWrite.html`;
        } else {
            alert("로그인을 해주세요");
        }
    })
        

})


// 스크롤시 이벤트 추가

// let isLoading = false;

// async function addPost () {
//     if (isLoading) return; 
//     const pageBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight
//     if(pageBottom) {
//         isLoading = true;
//         try {
//             const replyInfo:IReply[]
            
//         } finally {
//             isLoading = false;
//         }
//     }
// }
// window.addEventListener('scroll', throttle(addPost,200))