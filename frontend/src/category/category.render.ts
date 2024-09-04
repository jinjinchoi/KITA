import { IBoard } from "interface/boardAndReply.interface";

export function displayPost(postList : IBoard[]) : void{
    try {
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

        for(const postData of postList) {
            // 날짜 형식 '2024년 7월 24일' 로 변경
            const storedDate = new Date(postData.createdAt.replace(' ', 'T'));
            const koreanDate = storedDate.toLocaleDateString('ko-KR', dateOptions);
            const koreanTime = storedDate.toLocaleTimeString('ko-KR', timeOptions);
            const formattedDate =  `${koreanDate} ${koreanTime}`;


            const postRigion = document.createElement('div');
            postRigion.classList.add("post-region");
            document.querySelector(".post-container").append(postRigion);

            let classStatus:string ='';
            if(!postData.boardFile) {
                 classStatus = 'off';
            }

            const htmlContext =  `
    <!-- 상단 정보 영역 -->
    <div class = "post-profileRegion">
        <!-- 유저 프로필 사진 -->
        <div class = "profileRegion-userProfile">
            <img src="http://localhost:3000/${postData.uprofile}" class = "profileRegion-userImg">
        </div>
        <div class="profileRegion-userNickname"> <span> ${postData.unickname} </span></div>
        <!-- 게시물 날짜 -->
        <div class = "profileRegion-date"> <span>${formattedDate }</span></div>
    </div>
    <!-- 본분 영역 -->
    <a href="../detailpage/detailpage.html?category=${postData.categories}&id=${postData.id}" class="post-A">
        <div class="post-mainContainer">
            <!-- 글 -->
            <div class="mainContainer-titleRegion"><h3>${postData.boardTitle}</h3></div>
            <div class="mainContainer-dataRegion"><span>${postData.boardContent}</span></div>
            <!-- 사진 or 영상 -->
            <div class="mainContainer-fileRegion ${classStatus}"> <img src="" class = "mainContainer-file ${classStatus}"> </div>
        </div>
    </a>
    <!-- 댓글, 좋아요 영역 -->
    <div class = "post-bottomContainer">
        <!-- 댓글 -->
        <a href="" class="bottomContainer-comment-a"><div class = "bottomContainer-buttonReion"><span> 💬 ${postData.numberOfComment} </span></div></a>
        <!-- 좋아요 -->
        <div class = "bottomContainer-buttonReion" id = "bottomContainer-buttonReion-${postData.id}"><span> ♡ ${postData.boardLike}</span></div>
    </div>
<hr class="postDivide">
<!-- 게시물 영역 종료 -->
`
            
            postRigion.innerHTML = htmlContext;

            
            // 이미지가 존재하면 추가
            const imgTag = postRigion.querySelector(".mainContainer-file") as HTMLImageElement;
            if (!postData.boardFile) {
                imgTag.src = ""
            } else {
                imgTag.src = `http://localhost:3000/${postData.boardFile}`
            }

            // 댓글 버튼 누를시 댓글 창으로 바로 이동
            postRigion.querySelector(".bottomContainer-comment-a").addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = `../detailpage/detailpage.html?category=${postData.categories}&id=${postData.id}#commentContainer`;
            })

            // 좋아요 버튼 누를시 좋아요 버튼이 있는 쪽으로 이동
            postRigion.querySelector(`#bottomContainer-buttonReion-${postData.id}`).addEventListener("click", () => {
                window.location.href = `../detailpage/detailpage.html?category=${postData.categories}&id=${postData.id}#bottomContainer-buttonReion`;
            })
        }
    } catch (err) {
        console.log(err.message);
    }
}