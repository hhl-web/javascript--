// jsonp本质上是利用script标签进行数据通讯，script 的src属性要考虑url，params，callback
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
        // 利用script进行通讯,传入callback来接收响应数据
        const scriptEle =document.createElement('script');
        scriptEle.src =getUrl();
        document.body.appendChild(scriptEle);
        window[callbackName] =data=>{
            resove(data);
            document.removeChild(scriptEle)
        }
    })
}