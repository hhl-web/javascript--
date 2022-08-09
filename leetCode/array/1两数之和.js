/*
给定一个整数数组，返回两个数字的索引，使它们相加到特定目标。
您可以假设每个输入只有一个解决方案，并且您可能不会两次使用相同的元素。
例：
给定nums = [2,7,11,15]，target = 9，
因为nums [ 0 ] + nums [ 1 ] = 2 + 7 = 9，
返回[ 0，1 ]*/

// 遍历2次
const twoSum1 = function (nums, target) {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const item = nums[i] + nums[j];
            if (target === item) {
                return [i, j];
            }
        }
    }
};

// 遍历一次
// 如果对同一个数组需要进行两次遍历操作，
// 那么可以通过创建一个obj,让数组的key和value对调放入obj，然后直接取
let twoSum2 = function (nums, target) {
    let len = nums.length;
    let obj = {};
    for (let i = 0; i < len; i++) {
        let key =  target-nums[i] ;
        if (obj[key] !== undefined) {
            return [obj[key], i]
        }
        obj[nums[i]] = i;
    }
}
console.log(twoSum2([ 1, 14, -2 ,9,10,-1,7],9))