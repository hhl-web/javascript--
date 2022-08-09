const topKFrequent =(words,k)=>{
    let map =new Map();
    words.forEach(w=>{
        map.set(w,map.has(w)?map.get(w)+1:1);
    });
    const array = Array.from(map).sort((a,b)=>b[1]-a[1]);
    return array.slice(0,k).map((item=>item[0]))
}
console.log(topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], k = 2));