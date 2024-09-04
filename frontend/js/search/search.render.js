export function displayPost(postList) {
    try {
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
        for (const postData of postList) {
            const storedDate = new Date(postData.createdAt.replace(' ', 'T'));
            const koreanDate = storedDate.toLocaleDateString('ko-KR', dateOptions);
            const koreanTime = storedDate.toLocaleTimeString('ko-KR', timeOptions);
            const formattedDate = `${koreanDate} ${koreanTime}`;
            const postRigion = document.createElement('div');
            postRigion.classList.add("post-region");
            document.querySelector(".post-container").append(postRigion);
            let classStatus = '';
            if (!postData.boardFile) {
                classStatus = 'off';
            }
            const htmlContext = `
    <!-- 상단 정보 영역 -->
    <div class = "post-profileRegion">
        <!-- 유저 프로필 사진 -->
        <div class = "profileRegion-userProfile">
            <img src="http://localhost:3000/${postData.uprofile}" class = "profileRegion-userImg">
        </div>
        <div class="profileRegion-userNickname"> <span> ${postData.unickname} </span></div>
        <!-- 게시물 날짜 -->
        <div class = "profileRegion-date"> <span>${formattedDate}</span></div>
        <!-- 카테고리 -->
        <div class = "profileRegion-category"> <span>${postData.categories}</span></div>
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
        <div class = "bottomContainer-buttonReion"><span> ♡ ${postData.boardLike}</span></div>
    </div>
<hr class="postDivide">
<!-- 게시물 영역 종료 -->
`;
            postRigion.innerHTML = htmlContext;
            const imgTag = postRigion.querySelector(".mainContainer-file");
            if (!postData.boardFile) {
                imgTag.src = "";
            }
            else {
                imgTag.src = `http://localhost:3000/${postData.boardFile}`;
            }
        }
    }
    catch (err) {
        console.log(err.message);
    }
}
