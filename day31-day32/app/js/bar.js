
var bar={
    data:[],
    drawSvg:function () {
        let arr=[...this.data]
        let svgs=document.getElementById("s1")
        svgs.innerHTML=""
        let drawHeight=520
        let drawWidth=600
        svgs.setAttribute("height",drawHeight)
        svgs.setAttribute("width",drawWidth)
        let xMargin=drawWidth/12
        let histogram=xMargin-10
        let zhuWidth=histogram/arr.length
        let Maxs=Math.max(...arr.toString().split(','))
        let scaleSize=(drawHeight-30)/Maxs
        let copyMath=Maxs
        let scalHeight=copyMath/6
        let shaft=document.createElementNS('http://www.w3.org/2000/svg','path')
        shaft.setAttribute('d',"M10 10 L10 490 L600 490 M 0 20 L10 10 L20 20 M 590 480 L600 490 L590 500");
        shaft.setAttribute('fill','none')
        shaft.setAttribute('stroke','black')
        shaft.setAttribute('stroke-width','1')
        svgs.appendChild(shaft)
        for(let i=0;i<12;i++){
            let text=document.createElementNS('http://www.w3.org/2000/svg','text')
            text.textContent=i+1+"月"
            text.setAttribute("x",10+i*(xMargin))
            text.setAttribute("y",510)
            text.fill="black"
            svgs.appendChild(text)
        }
        for(let i=1;i<=6;i++){
            let text=document.createElementNS('http://www.w3.org/2000/svg','text')
            text.textContent=copyMath.toFixed(0)+"台"
            text.setAttribute("x",10)
            text.setAttribute("y",20+(Maxs-copyMath)*scaleSize)
            copyMath-=scalHeight
            svgs.appendChild(text)
        }
        for(let i=0;i<arr.length;i++){
            let a=(Math.random()*255).toFixed(0)
            let b=(Math.random()*255).toFixed(0)
            let c=(Math.random()*255).toFixed(0)
            for(let j=0;j<arr[0].length;j++){
                let react=document.createElementNS('http://www.w3.org/2000/svg','rect')
                react.setAttribute("width",zhuWidth)
                react.setAttribute("height",arr[i][j]*scaleSize)
                react.setAttribute("x",10+xMargin*j+i*zhuWidth)
                react.setAttribute("y",drawHeight-30-arr[i][j]*scaleSize)
                react.setAttribute("fill",'rgba('+a+','+b+','+c+',0.4)')
                svgs.appendChild(react)
            }
        }

    },
    clearData:function(arr){
        this.data=[]
        this.data.push(arr)
        this.drawSvg()
    },
    redata:function (arr) {
        let flag=false
        for(let i=0;i<this.data.length;i++){
            if(this.data[i].toString()===arr.toString()){
                flag=true
                break
            }
        }
        if(!flag){
            this.data.push(arr)
            this.drawSvg()
        }

    }
}
module.exports=bar