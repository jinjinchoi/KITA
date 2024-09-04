// import { colorPainting, removePainting } from "./like.fillButton";
// import { DoYouLike } from "./like.getIsLike";

// document.addEventListener("DOMContentLoaded", async () => {
//     const param = new URLSearchParams(window.location.search);

//     const category = param.get('category');
//     const id = param.get('id');
//     const boardId = Number(id);

//     try {
//         const checkIsLike : boolean = await DoYouLike(boardId, category, "testId");

//         if(checkIsLike)
//             colorPainting();
//         else {
//             removePainting();
//         }
        
//     } catch (err) {
//         console.log("좋아요 로직 오류: ", err.message)
//     }
// })