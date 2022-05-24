// 求出一个二维数组[[A, B], [a, b], [1, 2]]所有排列组合

// 输入[[A, B], [a, b], [1, 2]]

// 输出[Aa1, Aa2, Ab1, Ab2, Ba1, Ba2, Bb1, Bb2]

// 两个数组的合并
function getResult (arr1,arr2){
    if(!Array.isArray(arr1)|| !Array.isArray(arr2)) return [];
    if(arr1.length===0) return arr2;
    if(arr2.length ===0 )return arr1;
    let result =[]
    for(let i= 0;i<arr1.length;i++){
        for(let j=0;j<arr2.length;j++){
            result.push(String(arr1[i]) + String(arr2[j]));
        }
    }
    return result;
}
// 栈的思想
function findAll(arr){
    let result =[];
    let stack =arr;
    while(stack.length){
        const item =stack.shift();
        result=getResult(result,item)
    }
    return result;
}


console.log(findAll([['A', 'B'], ['a', 'b'], [1, 2]]));