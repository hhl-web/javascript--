// 需要解析的链接：
let url = 'http://www.domain.com/order?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
let url1 ='https://eggjs.github.io/zh/guide/controller.html';

parse(url)
// 解析url为：
// {
//     "protocol": "http",
//         "hoshostname": "www.domain.com",
//             "path": "order",
//                 "query": {
//         "user": "anonymous",
//             "id": "456",
//                 "city": "北京",
//                     "enabled": true
//     }
// }
// decodeURI() 函数能解码由encodeURI 创建或其它流程得到的统一资源标识符（URI）
function parse(url){
    const protocolArr = url?.split('://') || [];
    const protocol = protocolArr[0];
    const hoshostnameArr = protocolArr[1]?.split('/') || [];
    const hoshostname = hoshostnameArr[0] || [];
    const pathArr = hoshostnameArr[1]?.split('?');
    const path = pathArr[0];
    const queryArr = pathArr[1]?.split('&') || [];
    const query ={};
    for(let i =0 ;i< queryArr.length;i++){
        let [key,value]=queryArr[i]?.split('=');
        if(!value){
            value = true;
        }

        query[key] =decodeURI(value);
    }
    return {
        protocol,
        hoshostname,
        path,
        query
    }
}

console.log(parse(url))