const findMedianSortedArrays = function (num1, num2) {
    let arr = num1.concat(num2).sort((a, b) => a - b);
    let len = arr.length;
    if (len % 2 === 0) {
        let end = len / 2;
        let start = end - 1;
        return (arr[end] + arr[start]) / 2;
    } else {
        return arr[Math.ceil(len / 2 - 1)];
    }
}
console.log(findMedianSortedArrays([3], [-2,-1]));