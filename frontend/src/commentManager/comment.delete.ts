
export async function deleteComment(category : string, boardId : string, replyId : string, userToken : string) : Promise<void> {

    try {
        const response = await fetch(`http://localhost:3000/board/${category}/${boardId}/${replyId}/replyDelete`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "userToken": userToken,
            },
            credentials : 'include',
        });

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
        console.log("댓글 삭제 로직 오류: ", err);
    }
}