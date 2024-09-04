// 게시물 삭제 로직
// 아이디 비교 필요
export async function deleteBoard(uid : string, boardId : string, category : string) : Promise<void> {

    try {
        const response = await fetch(`http://localhost:3000/board/${category}/${boardId}/postDelete`, {
            method: 'DELETE',
            credentials : "include",
        });

        if (!response.ok) {
            if (response.status === 401) {
                alert("로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.")
                throw new Error("인증 오류 - 토큰이 유효하지 않습니다.");
            } else {
                throw new Error("리스폰스 응답 오류");
            }
        } else {
            window.location.href = `../category/${category}.html`;
        }

    } catch (err) {
        console.log("patch 오류: ", err);
    }
}