const merge =(left,right)=>{
    const result =[];
    while(left.length && right.length){
        if(left[0]<right[0]){
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }
    }
    return result.concat(left,right);
}
const mergeSort =(arr)=>{
    const middle = Math.floor(arr.length/2);
    const left =arr.slice(0,middle);
    const right =arr.slice(middle);
    return merge(mergeSort(left),mergeSort(right));
}
/**
 * 左右先分治再合并
 */