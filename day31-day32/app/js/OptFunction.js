let line=require('./line')
let bar=require('./bar')
module.exports={
    timeout:1000,
    fangdou:function () {
        let outflag
        return function () {
            let flag
            if(outflag){
                clearTimeout(outflag)
            }
            flag=!outflag
            outflag=setTimeout(function () {
                outflag=null
            },this.timeout)
            if(flag){
                let e=arguments[0].target

                while (e.tagName!=="TD"){
                    if(e.tagName==="TH"){
                        return false
                    }
                    e=e.parentNode
                }
                let arr=e.parentNode.getAttribute("score").split(',')
                bar.redata(arr)
                line.redata(arr)
            }

        }
    }
}