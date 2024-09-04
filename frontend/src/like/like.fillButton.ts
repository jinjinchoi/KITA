
// 색을 채운다.
export function colorPainting () : void {
    const likeDiv = document.querySelector("#bottomContainer-like") as HTMLDivElement;
    likeDiv.style.background = "pink";
}

// 색을 지운다.
export function removePainting () : void {
    const likeDiv = document.querySelector("#bottomContainer-like") as HTMLDivElement;
    likeDiv.style.background = "rgb(221, 229, 231)";
}