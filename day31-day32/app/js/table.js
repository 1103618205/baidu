import {seleData} from "./checkbox";

let line=require('./line')
let bar=require('./bar')
let optFunction=require('./OptFunction')//防抖函数
import {creatWrap,reamoveInput} from "./wrap";

export function renderTable(arr) {
    tableBox.innerHTML=""
    let table=document.createElement("table")
    let wrap=creatWrap();
    let targes=null
    let texts=""
    wrap.onclick=function(e){
        let index=Array.prototype.indexOf.call(e.target.parentNode.childNodes,e.target)
        if(index===0){
            let dom=document.querySelector('.tdInpt')
            if(!Number(dom.value)||Number(dom.value)<0){
                alert("请输入数字")
                return false
            }else{
                texts=dom.value
                reamoveInput(targes,texts)
                wrap.classList.add("hideWrap")
                let product=targes.parentNode.getAttribute("product")
                let region=targes.parentNode.getAttribute("region")
                let i=0
                for(i=0;i<sourceData.length;i++){
                    if(sourceData[i].product===product&&sourceData[i].region==region){
                        break
                    }
                }

                let parent=targes.parentNode.childNodes
                let newScale=[]
                for(let k=0;k<parent.length;k++){
                    if(Number(parent[k].textContent)){
                        newScale.push(Number(parent[k].textContent))
                    }
                }
                sourceData[i].sale=newScale
                localStorage.setItem("jssorce",JSON.stringify(sourceData))
                renderTable(seleData())
                table.onclick(newScale)
            }
        }else{
            reamoveInput(targes,texts)
            wrap.classList.add("hideWrap")
        }
    }
    table.addEventListener("keydown",function (e) {
        if(e.keyCode===13){
            wrap.querySelectorAll('li')[0].click()
        }else if(e.keyCode===27){
            wrap.querySelectorAll('li')[1].click()
        }
    })
    table.onmouseover=optFunction.fangdou()
    table.oncontextmenu=function(e){
        if(e.target.tagName==="INPUT"){
            return false
        }
        if(targes){
            console.log(texts)
            reamoveInput(targes,texts)
            wrap.classList.add("hideWrap")
        }
        let target=e.target
        while (target.tagName!=="TD"){
            target=target.parentNode
        }
        // let index=Array.prototype.indexOf.call(target.parentNode.childNodes,target)
        if(target.tagName!=="TH"&&Number(target.textContent)){
            let inp=document.createElement("input")
            inp.classList.add("tdInpt")
            let text=target.textContent
            inp.value=text
            target.innerHTML=""
            target.appendChild(inp)
            wrap.style.left=e.x+"px"
            wrap.style.top=e.y+"px"
            targes=target
            inp.focus()
            texts=text
            wrap.classList.remove("hideWrap")

        }
        e.preventDefault()
    }
    table.onclick=function(e){
        let target=e.target
        let arr
        if(e.target){
            while (target.tagName!=="TD"){
                target=target.parentNode
            }
            arr=target.parentNode.getAttribute("score").split(',')
        }else{
            arr=e
        }
        line.clearData(arr)
        bar.clearData(arr)
    }
    let tr=document.createElement("tr");
    let thList=["商品","地区"]
    let headKey=['product','region']
    let record=new Object();//记录位置和行数信息
    let queue=arr
    for(let i=1;i<=12;i++){
        thList.push(i+"月")
        headKey.push(i-1)
    }
    for (let values of thList){
        let th=document.createElement("th");
        let text=document.createTextNode(values);
        th.appendChild(text)
        tr.appendChild(th)
    }
    table.appendChild(tr);
    queue.sort(function (a,b){
        return a.product-b.product
    })
    let ele
    let index=0
    let result=[]
    for(let i=0;i<queue.length;i++){
        if(queue[i].product==ele){
            record[index]++
        }else{
            ele=queue[i].product
            index=i
            record[index]=1
        }
    }
    activeTable(table,queue,"product",record,headKey)
    for(let i=queue.length-1;i>=0;i--){
        if(record[i]!=1){
            queue.splice(i,record[i])
            delete record[i]
        }
    }
    record={}
    ele=""
    index=0
    queue.sort(function (a,b) {
        return a.region-b.region
    })
    for(let i=0;i<queue.length;i++){
        if(queue[i].region==ele){
            record[index]++
        }else{
            ele=queue[i].region
            index=i
            record[index]=1
        }
    }
    activeTable(table,queue,"region",record,headKey)
    tableBox.appendChild(table)
}
export function activeTable(tableTag,queue,where,record,headKey) {
    let tr
    for(let i=0;i<queue.length;i++){
        if(record[i]!=1||!record[i]){
            tr=document.createElement("tr");
            tr.setAttribute("product",queue[i].product)
            tr.setAttribute("region",queue[i].region)
            tr.setAttribute("score",queue[i].sale)
            for(let key of headKey){
                if(key!=where){
                    let td=document.createElement("td");
                    if(typeof key == "number")
                        td.textContent=queue[i]["sale"][key]
                    else
                        td.textContent=queue[i][key];
                    tr.appendChild(td)
                }else{
                    if(record[i]){
                        let td=document.createElement("td");
                        td.rowSpan=record[i]
                        td.textContent=queue[i][key];
                        tr.appendChild(td)
                    }
                }
            }
            tableTag.appendChild(tr)
        }
    }
}