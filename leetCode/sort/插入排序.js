const insertSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        const temp = arr[i];
        let j = i;
        while (j > 0) {
            if (arr[j - 1] > temp) {
                arr[j] = arr[j - 1];
            } else {
                break;
            }
            j--;
        }
        arr[j] = temp;
    }
    return arr;
}

const arr = [2, 5, 4, 1, 3, 0]
console.log(insertSort(arr));
// 指针分为左右两边，左边是已经排好序的，右边是待排序。