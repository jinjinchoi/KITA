import { IReply } from "../interface/boardAndReply.interface";
import { addBtnEvent, addRemoveEvent, addUpdateEvent } from "../commentManager/comment.eventControll"
import { ICookieUserInfo } from "interface/cookie.interface";
import { getUserIdAndNickName } from "../loginLogic/loginLogic.getUserInfo";

export async function drawComment (replyData : IReply[], repeat : boolean) : Promise<void> {
    let commentRegion : HTMLDivElement;

    const dateOptions : Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: 'long',
        day: 'numeric',
        
    };
    const timeOptions : Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    // rander 시작
    for(const commentData of replyData) {
        if(repeat) {
            commentRegion = document.querySelector(`.commentContainer-frofileAndContent[data-set="${commentData.parentId}"]`);
        }else {
            commentRegion = document.querySelector(".commentContainer");
        }
        const storedDate = new Date(commentData.createdAt.replace(' ', 'T'));
        const koreanDate = storedDate.toLocaleDateString('ko-KR', dateOptions);
        const koreanTime = storedDate.toLocaleTimeString('ko-KR', timeOptions);
        const formattedDate =  `${koreanDate} ${koreanTime}`;
    

        const commentContainer = document.createElement("div");
        if(!repeat) {
            commentContainer.classList.add('commentContainer-frofileAndContent');
        } else {
            commentContainer.classList.add('commentContainer-frofileAndContent-repeat');
        }
        
        commentContainer.setAttribute('data-set', `${commentData.id}`)
        commentRegion.insertAdjacentElement('afterend', commentContainer);

        console.log(commentData);

       const commentHTMLSyntax =
`
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
`

        commentContainer.innerHTML = commentHTMLSyntax;
        
        // 삭제된 글이면 수정 삭제 답글 버튼 안뜨게
        if(commentData.isDeleted) {
            commentContainer.querySelector(".userProfileContainer-repliesBtnContainer").remove();
            commentContainer.querySelector(".userProfileContainer-updateBtnContainer").remove();
            commentContainer.querySelector(".userProfileContainer-deleteBtnContainer").remove();

            const text = commentContainer.querySelector(".replyContainer-span") as HTMLSpanElement;
            text.style.color = "lightgray"
        }

        const userInfo: ICookieUserInfo = await getUserIdAndNickName();
        
        if (!commentData.isDeleted) {
            // 로그인 시에만 답글 버튼 보이게
            if (userInfo) {
                // 쿠키에서 유저 정보 불러오기
                
                // 답글 버튼 이벤트 리스너 추가
                const replyBtn = commentContainer.querySelector(".userProfileContainer-repliesBtnContainer") as HTMLDivElement;
                addBtnEvent(replyBtn);

                // 쿠키에서 유저 정보 불러오기
                if(userInfo.uid === commentData.uid) {
                    // 댓글 수정 버튼 이벤트 리스너 추가
                    const updateBtn = commentContainer.querySelector(`.userProfileContainer-updateBtnContainer`) as HTMLDivElement;
                    addUpdateEvent(updateBtn, commentData.replyContent);

                    // 댓글 삭제 버튼 이벤트 리스너 추가
                    const deleteBtn = commentContainer.querySelector(`.userProfileContainer-deleteBtnContainer`) as HTMLDivElement;
                    addRemoveEvent(deleteBtn, commentData.category, String(commentData.boardId), String(commentData.id), commentData.uid);
                } else {
                    commentContainer.querySelector(".userProfileContainer-updateBtnContainer").remove();
                    commentContainer.querySelector(".userProfileContainer-deleteBtnContainer").remove();
                }
            } else {
                commentContainer.querySelector(".userProfileContainer-repliesBtnContainer").remove();
                commentContainer.querySelector(".userProfileContainer-updateBtnContainer").remove();
                commentContainer.querySelector(".userProfileContainer-deleteBtnContainer").remove();
            }
        }

        // 대댓글이면 답글버튼 삭제
        if(repeat && !commentData.isDeleted && userInfo) {
            commentContainer.querySelector(".userProfileContainer-repliesBtnContainer").remove();
        }

        if(Array.isArray(commentData.replies) && commentData.replies.length > 0) {
            drawComment(commentData.replies, true);
        }
    }

}