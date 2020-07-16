export function renderData() {
    if(location.hash){
        let params=decodeURIComponent(location.hash)
        params=params.substr(1)
        let region=[]
        let product=[]
        let regionDom=document.querySelectorAll("#region-radio-wrapper input")
        let productDom=document.querySelectorAll("#product-radio-wrapper input")
        region=params.split('&')[0].split('=')[1].split(',')
        product=params.split('&')[1].split('=')[1].split(',')
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
    }

}