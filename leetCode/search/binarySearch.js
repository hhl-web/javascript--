const binarySearch = (arr, item) => {
    let low = 0;
    let hight = arr.length - 1;
    let mid = 0;
    while (low <= hight) {
        mid = Math.floor((low + hight) / 2);
        if (arr[mid] < item) {
            low = mid + 1;
        } else if (arr[mid] > item) {
            hight = mid - 1;
        } else {
            return mid
        }
    }
    return -1;
}

// 二分搜索的前提是数组是有序的
// 二分搜索  O(logn)

const res = [1,2,3,4,5]
console.log(binarySearch(res,4));