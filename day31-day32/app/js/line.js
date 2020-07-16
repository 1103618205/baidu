
    let line={
        data:[],
        dataMax:0,
        MaxFlag:false,
        drawLine:function() {
            let arr=[...this.data]
            let cans=document.getElementById("canvs")
            cans.innerHtml=""
            let ctx=cans.getContext("2d")
            cans.height=500
            cans.width=600
            let Maxs=Math.max(...arr.toString().split(','))
            let copyMaxs=Maxs
            let scalcHeight=490/Maxs
            let marginWith=580/12
            let marginHeight=Maxs/6
            ctx.beginPath()
            ctx.moveTo(10,0)
            ctx.lineTo(10,490)
            ctx.lineTo(580,490)
            ctx.moveTo(0,10)
            ctx.lineTo(10,0)
            ctx.lineTo(20,10)
            ctx.moveTo(570,480)
            ctx.lineTo(580,490)
            ctx.lineTo(570,500)
            ctx.stroke()
            for(let i=0;i<12;i++){
                ctx.fillText(i+1+"月",10+marginWith*i,500)
            }
            ctx.stroke()
            for(let i=1;i<=6;i++){
                ctx.fillText(copyMaxs.toFixed(0)+"台",10,+20+(Maxs-copyMaxs)*scalcHeight)
                copyMaxs-=marginHeight
            }
            ctx.stroke()
            for(let i=0;i<arr.length;i++){
                for(let j=0;j<arr[0].length;j++){
                    if(j===0){
                        ctx.moveTo(10+j*marginWith,(490-arr[i][j]*scalcHeight))
                    }else{
                        ctx.lineTo(10+j*marginWith,(490-arr[i][j]*scalcHeight))
                    }
                }
                ctx.stroke()
            }

            for(let i=0;i<arr.length;i++){
                let a=(Math.random()*255).toFixed(0)
                let b=(Math.random()*255).toFixed(0)
                let c=(Math.random()*255).toFixed(0)
                for(let j=0;j<arr[0].length;j++){
                    ctx.fillStyle='rgb('+a+','+b+','+c+')'
                    ctx.beginPath()
                    ctx.arc(10+j*marginWith,490-arr[i][j]*scalcHeight,5,0,2*Math.PI)
                    ctx.fill()
                }

            }

        },
        clearData:function(arr){
            this.data=[]
            this.data.push(arr)
            this.drawLine()
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
                this.drawLine()
            }
        }

    }
    module.exports=line
