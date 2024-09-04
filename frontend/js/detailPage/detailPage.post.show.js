var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { likeImplement } from "../like/like.implement.js";
import { deleteBoard } from "../delete/detailPage.delete.js";
import { getUserIdAndNickName } from "../loginLogic/loginLogic.getUserInfo.js";
export function drawPostRegion(postData) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("postData", postData);
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
        const storedDate = new Date(postData.createdAt.replace(' ', 'T'));
        const koreanDate = storedDate.toLocaleDateString('ko-KR', dateOptions);
        const koreanTime = storedDate.toLocaleTimeString('ko-KR', timeOptions);
        const formattedDate = `${koreanDate} ${koreanTime}`;
        const detailContainer = document.querySelector(".onlyPostContainer");
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("topProfileContainer");
        detailContainer.append(profileDiv);
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("contentContainer");
        detailContainer.append(contentDiv);
        const profileHTMLSyntax = `
<div class="topProfileContainer">
    <div class="topProfileContainer-userImgContainer"> <img src="http://localhost:3000/${postData.uprofile}" class="topProfileContainer-userImgContainer-img"> </div> <!-- 프로필 사진 -->
    <div class="topProfileContainer-nicknameContainer"><span>${postData.unickname}</span></div>
    <div clasas="topProfileContainer-dateContainer"><span>${formattedDate}</span></div>
    <div class="topProfileContainer-categoryContainer"><span>${postData.categories}</span></div>
    <div class="topProfileContainer-viewContainer"><span>조회수 ${postData.boardView}</span></div>
</div>
`;
        const postHTMLSyntax = `
<div class = "contentContainer-titleContainer">
    <h3>${postData.boardTitle}</h3>
</div>
<div class="contentContainer-contentContainer"><span>${postData.boardContent}</span></div>
<!-- 이미지 들어가는 div -->

<!-- 댓글, 좋아요 버튼 영역 -->
<div class = "post-bottomContainer">
    <!-- 댓글 -->
    <div class = "bottomContainer-buttonReion"><span> 💬 ${postData.numberOfComment} </span></div>
    <!-- 좋아요 -->
    <div class = "bottomContainer-buttonReion" id = "bottomContainer-like"><span> ♡ ${postData.boardLike}</span></div>
</div>

`;
        profileDiv.innerHTML = profileHTMLSyntax;
        contentDiv.innerHTML = postHTMLSyntax;
        const userInfo = yield getUserIdAndNickName();
        if (userInfo) {
            if (userInfo.uid === postData.uid && userInfo) {
                const updateDiv = document.createElement("div");
                updateDiv.classList.add('topProfileContainer-UDContainer');
                updateDiv.innerHTML =
                    `
<a href="../update/${postData.categories}BoardUpdate.html?category=${postData.categories}&id=${postData.id}" class="UDContainer-updateA" data-set= "${postData.id}"><div class="UDContainer-updateContainer"><span>수정</span></div></a>
<div class="UDContainer-deleteContainer" data-set="${postData.id}"><span>삭제</span></div>
`;
                profileDiv.querySelector(".topProfileContainer").append(updateDiv);
                profileDiv.querySelector(".UDContainer-deleteContainer").addEventListener("click", () => {
                    if (confirm("정말로 삭제하시겠습니까?")) {
                        deleteBoard(postData.uid, String(postData.id), postData.categories);
                    }
                    else {
                        return;
                    }
                });
            }
            contentDiv.querySelector("#bottomContainer-like").addEventListener("click", () => {
                likeImplement(postData.categories, postData.id);
            });
        }
        else {
            contentDiv.querySelector("#bottomContainer-like").addEventListener("click", () => {
                alert("로그인을 해주세요.");
            });
        }
        if (postData.boardFile) {
            const fileContainer = document.createElement('div');
            fileContainer.classList.add("contentContainer-fileContainer");
            const imgTag = document.createElement('img');
            imgTag.classList.add("contentContainer-img");
            document.querySelector('.contentContainer-contentContainer').insertAdjacentElement('afterend', fileContainer);
            fileContainer.append(imgTag);
            const src = `http://localhost:3000/${postData.boardFile}`;
            imgTag.src = src;
        }
    });
}
