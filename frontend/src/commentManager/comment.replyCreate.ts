//  댓글에 답글 다는 로직

export async function sendReply(e : SubmitEvent, parentId : string) {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const id = params.get('id');

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append('parentId', parentId);
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
            credentials : 'include',
            body : JSON.stringify(data),
        })

        console.log(await response.json())
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
}