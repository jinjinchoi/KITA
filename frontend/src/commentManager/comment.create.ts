// 본문 댓글 다는 로직

import { isLogin } from "../loginLogic/loginLogic.isLogin";

document.querySelector(".commentInputContainer-form").addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const whetherBeingLogin = await isLogin();
    if(!whetherBeingLogin) {
        alert("로그인을 해주세요")
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const id = params.get('id');

    const formData = new FormData(e.target as HTMLFormElement);
    const replyData = formData.get('replyContent') as String
    if(replyData.trim() === '') {
        alert('댓글 내용을 입력해주세요')
        return;
    }

    // 쿠키에서 유저 정보 가져옴

    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch(`http://localhost:3000/board/${category}/${id}/replyCreate`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data),
            credentials : 'include',
        })


        if (!response.ok) {
            if (response.status === 401) {
                alert("로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.")
                throw new Error("인증 오류 - 토큰이 유효하지 않습니다.");
            } else {
                throw new Error("리스폰스 응답 오류");
            }
        } else {
            window.location.reload();
        }
        
    } catch (err) {
        console.log("댓글 생성 로직 오류: ", err);
    }
})