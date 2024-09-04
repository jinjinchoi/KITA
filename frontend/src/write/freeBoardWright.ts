// 파일 업로드시 파일명 보여주는 함수
document.querySelector("#bottom-file").addEventListener("change", (e) => {
    const uploadedFile = e.target as HTMLInputElement;
    const file = uploadedFile.files[0];
    
    if(file && file.name.length > 0) {
        document.querySelector(".bottom-fileName").textContent = file.name;
    }
    else {
        document.querySelector(".bottom-fileName").textContent = "";
    }
})

// 업로드하기
document.querySelector(".wright-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    // 공백 방지용
    const textAreaValue = formData.get('boardContent') as string;
    const inputValue = formData.get('boardTitle') as string;
    if(inputValue.trim() === '') {
        alert("제목을 입력해주세요")
        return;
    }
    if(textAreaValue.trim() === '') {
        alert("내용을 입력해주세요")
        return;
    }

    // const userInfo : ICookieUserInfo = await getUserIdAndNickName();

    try {
        const response = await fetch("http://localhost:3000/board/free/postCreate", {
            method: 'POST',
            body: formData,
            credentials : 'include',
        });

        if (response.ok) {
            window.location.href = "../category/free.html"
        } else if (response.status === 401) {
            alert("로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.")
            throw new Error("인증 오류 - 토큰이 유효하지 않습니다.");
        } else {
            console.log("서버 오류: ", response.status);
            alert("서버 오류 발생, 다시 시도해주세요.")
        }

    } catch (err) {
        console.log("작성페이지 오류 발생 :  ", err);
    }
});

// 상단 버튼 눌렀을 때 이동