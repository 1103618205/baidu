import {createCheckbox,seleData} from "./js/checkbox";
import {renderTable,activeTable} from './js/table'
import {renderData} from "./js/localHash";
import '../static/baseCss.css'
let arrs=[{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]
if(localStorage.getItem("jssorce")){
    global.sourceData =JSON.parse(localStorage.getItem("jssorce"))
}else{
    localStorage.setItem("jssorce",JSON.stringify(arrs))
    global.sourceData=arrs
}

global.seleDom=document.querySelector("#region-select");
global.tableBox=document.querySelector("#table-wrapper");
global.regionHash=new Set();

createCheckbox("region-radio-wrapper",[{
    value: "华东",
    text: "华东"
}, {
    value: "华北",
    text: "华北"
}, {
    value: "华南",
    text: "华南"
}
]);
createCheckbox("product-radio-wrapper",[{
    value: "手机",
    text: "手机"
}, {
    value: "笔记本",
    text: "笔记本"
}, {
    value: "智能音箱",
    text: "智能音箱"
}
]);
window.onpopstate=function (e) {
    let region=[]
    let product=[]
    let regionDom=document.querySelectorAll("#region-radio-wrapper input")
    let productDom=document.querySelectorAll("#product-radio-wrapper input")
    region=e.state.regin
    product=e.state.product
    for(let i=0;i<regionDom.length-1;i++){
        if(region.includes(regionDom[i].value)){
            regionDom[i].checked=true
        }else{
            regionDom[i].checked=false
        }
    }
    for(let i=0;i<productDom.length-1;i++){
        if(product.includes(productDom[i].value)){
            productDom[i].checked=true
        }else{
            productDom[i].checked=false
        }
    }
    renderTable(seleData())

}
document.getElementById("find").addEventListener("click",function () {
    renderTable(seleData())
})
