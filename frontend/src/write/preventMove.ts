
// 상단 이동버튼 눌렀을 때 경고
document.querySelector(".topBar-button-a").addEventListener('click', (e) => {
    if(!preventMove())
        return;

    if(!confirm("작성중인 내용이 있습니다. 정말로 페이지를 이동하시겠습니까?"))
        e.preventDefault();
})



// 페이지 닫을 때 경고
document.addEventListener('beforeunload', (e : BeforeUnloadEvent) => {
    if(!preventMove())
        return;

    const message = "작성중인 내용이 있습니다. 정말로 페이지를 닫으시겠습니까?" 
    e.preventDefault();
    e.returnValue = message;
    return message;
})

function preventMove() : boolean {
    const areaData = document.querySelector(".contentRegion-textarea") as HTMLTextAreaElement;
    console.log(areaData);
    if(!areaData.value)
        return false;
    return true;
}