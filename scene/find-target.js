/**
 * 双指针
 * @param {*} arr 
 * @param {*} target 
 * @returns 
 */
function findTarget1(arr,target){
    if(!Array.isArray(arr)) return [];
    for(let i =0;i<arr.length;i++){
        let lIdx =i;
        let rIdx = arr.length-1;
        while(lIdx<rIdx){
            const lItem =arr[lIdx];
            const rItem =arr[rIdx];
            if(lItem+rItem ===target) return [lIdx,rIdx];
            rIdx--;
        }
    }
    return []
}

/**
 * map解法
找到数组中相加为target的两个值拼多多 pdd-20211109 第四题
arr = [ 2, 14, -2 ,9,10,-5,7] target = 9
输出对应值的下标: [0,6]
 * @param {*} arr 
 * @param {*} target 
 * @returns 
 */
function findTarget(arr, target) {
    let hash = {}
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        // 找到目标值
        if (hash[item]) {
            return [hash[item], i]
        }
        // 没找到
        let num = target - item
        hash[num] = i
    }
    return false
}
console.log(findTarget([ 1, 14, -2 ,9,10,-1,7],9))