
const selectSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i; j < arr.length; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
            if (min !== i) {
                [arr[i], arr[min]] = [arr[min], arr[i]];
            }
        }
    }
    return arr;
}

const arr = [2, 5, 4, 1, 3, 0];
console.log(selectSort(arr));
// 嵌套循环找最小值