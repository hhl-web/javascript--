const frequencySort =function(s){
    if(s.length===0) return '';
    let hasMap =new Map();
    // 将数组转成字符串split
    s.split('').forEach((w)=>{
        hasMap.set(w,hasMap.has(w)?hasMap.get(w)+1:1);
    });
    let res='';
    // Array.from将map转成数组
    let array = Array.from(hasMap).sort((a,b)=>a[1]-b[1]);
    console.log(array)
    for(let i =0;i<array.length;i++){
        const [key,value] = array[i];
        if(value===1){
            res+=key
        }else{
            for(let j=1;j<=value;j++){
                res+=key;
            }
        }
    }
    return res;
}
console.log(frequencySort("raaeaedere"));