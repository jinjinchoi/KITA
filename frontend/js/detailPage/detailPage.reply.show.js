var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addBtnEvent, addRemoveEvent, addUpdateEvent } from "../commentManager/comment.eventControll.js";
import { getUserIdAndNickName } from "../loginLogic/loginLogic.getUserInfo.js";
export function drawComment(replyData, repeat) {
    return __awaiter(this, void 0, void 0, function* () {
        let commentRegion;
        const dateOptions = {
            year: "numeric",
            month: 'long',
            day: 'numeric',
        };
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        for (const commentData of replyData) {
            if (repeat) {
                commentRegion = document.querySelector(`.commentContainer-frofileAndContent[data-set="${commentData.parentId}"]`);
            }
            else {
                commentRegion = document.querySelector(".commentContainer");
            }
            const storedDate = new Date(commentData.createdAt.replace(' ', 'T'));
            const koreanDate = storedDate.toLocaleDateString('ko-KR', dateOptions);
            const koreanTime = storedDate.toLocaleTimeString('ko-KR', timeOptions);
            const formattedDate = `${koreanDate} ${koreanTime}`;
            const commentContainer = document.createElement("div");
            if (!repeat) {
                commentContainer.classList.add('commentContainer-frofileAndContent');
            }
            else {
                commentContainer.classList.add('commentContainer-frofileAndContent-repeat');
            }
            commentContainer.setAttribute('data-set', `${commentData.id}`);
            commentRegion.insertAdjacentElement('afterend', commentContainer);
            console.log(commentData);
            const commentHTMLSyntax = `
<!-- 유저 정보 영역 -->
<div class="userImgContainer"> <img src="http://localhost:3000/${commentData.uprofile}" class="userProfileContainer-userImgContainer-img"></div>
<div class="entireUserInfo">
    <div class="userProfileContainer">
        <div class="userProfileContainer-nicknamecontainer"> <span>${commentData.unickname} </span></div>
        <div class="userProfileContainer-dateContainer"> <span>${formattedDate} </span></div>
        <div class="userProfileContainer-repliesBtnContainer" data-set="${commentData.id}"><span> 답글 </span></div>
        <div class="userProfileContainer-updateBtnContainer" data-set=${commentData.id}><span> 수정 </span></div>
        <div class="userProfileContainer-deleteBtnContainer" data-set=${commentData.id}><span> 삭제 </span></div>
    </div>
    <!-- 댓글 내용  -->
    <div class="replyContainer" data-set="${commentData.id}"><span class = "replyContainer-span" data-set="${commentData.id}">${commentData.replyContent}</span></div>
</div>
`;
            commentContainer.innerHTML = commentHTMLSyntax;
            if (commentData.isDeleted) {
                commentContainer.querySelector(".userProfileContainer-repliesBtnContainer").remove();
                commentContainer.querySelector(".userProfileContainer-updateBtnContainer").remove();
                commentContainer.querySelector(".userProfileContainer-deleteBtnContainer").remove();
                const text = commentContainer.querySelector(".replyContainer-span");
                text.style.color = "lightgray";
            }
            const userInfo = yield getUserIdAndNickName();
            if (!commentData.isDeleted) {
                if (userInfo) {
                    const replyBtn = commentContainer.querySelector(".userProfileContainer-repliesBtnContainer");
                    addBtnEvent(replyBtn);
                    if (userInfo.uid === commentData.uid) {
                        const updateBtn = commentContainer.querySelector(`.userProfileContainer-updateBtnContainer`);
                        addUpdateEvent(updateBtn, commentData.replyContent);
                        const deleteBtn = commentContainer.querySelector(`.userProfileContainer-deleteBtnContainer`);
                        addRemoveEvent(deleteBtn, commentData.category, String(commentData.boardId), String(commentData.id), commentData.uid);
                    }
                    else {
                        commentContainer.querySelector(".userProfileContainer-updateBtnContainer").remove();
                        commentContainer.querySelector(".userProfileContainer-deleteBtnContainer").remove();
                    }
                }
                else {
                    commentContainer.querySelector(".userProfileContainer-repliesBtnContainer").remove();
                    commentContainer.querySelector(".userProfileContainer-updateBtnContainer").remove();
                    commentContainer.querySelector(".userProfileContainer-deleteBtnContainer").remove();
                }
            }
            if (repeat && !commentData.isDeleted && userInfo) {
                commentContainer.querySelector(".userProfileContainer-repliesBtnContainer").remove();
            }
            if (Array.isArray(commentData.replies) && commentData.replies.length > 0) {
                drawComment(commentData.replies, true);
            }
        }
    });
}
