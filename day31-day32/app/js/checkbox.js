import {renderTable,activeTable} from './table'
export function seleData() {
    let regionDom=document.querySelectorAll("#region-radio-wrapper input")
    let productDom=document.querySelectorAll("#product-radio-wrapper input")
    let regin=[]
    let product=[]
    let lochash=""
    for(let i=0;i<regionDom.length-1;i++){
        if(regionDom[i].checked){
            regin.push(regionDom[i].value)
        }
    }
    for(let i=0;i<productDom.length-1;i++){
        if(productDom[i].checked){
            product.push(productDom[i].value)
        }
    }
    let arr=[];
    if(history.state.product.toString()!=product.toString()||history.state.regin.toString()!=regin.toString())
    history.pushState({"product":product,"regin":regin},null)
    for(let i=0;i<sourceData.length;i++){
        if(regin.includes(sourceData[i].region) || product.includes(sourceData[i].product)){
            arr.push(sourceData[i]);
        }
    }
    return arr;
}
export function createCheckbox(box,arr) {
    let boxDox=document.getElementById(box);
    let div
    for(let i=0;i<arr.length;i++){
        div=document.createElement("input")
        div.type="checkbox"
        div.setAttribute("value",arr[i].value);
        boxDox.appendChild(div)
        boxDox.appendChild(document.createTextNode(arr[i].text))
    }
    div=document.createElement("input")
    div.type="checkbox"
    div.setAttribute("value","4")
    div.setAttribute("checkbox-type","all")
    boxDox.appendChild(div)
    boxDox.appendChild(document.createTextNode("全选"))
    boxDox.onchange=function (e) {
        let boxarr=document.querySelectorAll("#"+box+" input")
        if(e.target.getAttribute("checkbox-type")=="all"){
            for(let i=0;i<boxarr.length;i++){
                boxarr[i].checked=e.target.checked
            }
        }
        for(let i=0;i<boxarr.length-1;i++){
            if(!boxarr[i].checked&&boxarr[i].getAttribute("checkbox-type")!="all"){
                boxarr[boxarr.length-1].checked=false
                break
            }else {
                boxarr[boxarr.length-1].checked=true
            }
        }
        seleData()
    }
}
