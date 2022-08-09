
const bubbleSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {      //轮
        for (let j = 0; j < arr.length - 1 - i; j++) {  //比较基数
            if (arr[j] > arr[j + 1]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            }
        }
    }
    return arr
}

const arr = [2, 5, 4, 1, 3, 0]
console.log(bubbleSort(arr));

// 时间复杂度2^n 空间复杂度 o(1)
/**
 *  冒泡排序：
    双重遍历，相邻比较，前面的比后面的大就交换位置。
    (大的值好像气泡慢慢升至表面)
 */