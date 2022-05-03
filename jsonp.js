const jsonp =({url,params,callbackName})=>{
    const getUrl=()=>{
        let dataSrc ='';
        for(const key in params){
            dataSrc+=`${key}=${params[key]}&`
        }
        dataSrc+=`callback=${callbackName}`;
        return dataSrc;
    }
    return new Promise((resove,reject)=>{
        const scriptEle =document.createElement('script');
        scriptEle.src =getUrl();
        document.body.appendChild(scriptEle);
        window[callbackName] =data=>{
            resove(data);
            document.removeChild(scriptEle)
        }
    })
}