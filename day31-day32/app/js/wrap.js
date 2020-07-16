export function creatWrap() {
    let wrap=document.createElement("ul")
    let li1=document.createElement("li")
    li1.textContent="确定"
    let li2=document.createElement("li")
    li2.textContent="取消"
    wrap.appendChild(li1)
    wrap.appendChild(li2)
    wrap.classList.add("hideWrap")
    document.body.appendChild(wrap)
    return wrap;
}
export function reamoveInput(target,text){
    target.innerHTML=""
    target.textContent=text
}
function submitInpt(target) {

}