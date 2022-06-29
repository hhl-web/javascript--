const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    const left = [];
    const right = [];
    const middle = Math.floor(arr.length / 2);
    const middleVal = arr[middle];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < middleVal) {
            left.push(arr[i]);
        }
        if (arr[i] > middleVal) {
            right.push(arr[i]);
        }
    }
   return quickSort(left).concat([middleVal],quickSort(right));
}

const arr = [2, 5, 4, 1, 3, 0]
console.log(quickSort(arr));

// 快速排序
// 选择"基准"（pivot），并将其与原数组分离，再定义两个空数组，用来存放一左一右的两个子集