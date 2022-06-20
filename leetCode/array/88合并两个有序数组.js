// 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// 输出：[1,2,2,3,5,6]
// 解释：需要合并 [1,2,3] 和 [2,5,6] 。
// 合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。


const merge1 = function (nums1, m, nums2, n) {
    nums1.splice(m, nums1.length - m, ...nums2);
    nums1.sort((a, b) => a - b);
    return nums1;
}

const merge2 = function (nums1, m, nums2, n) {
    let i = nums1.length - 1;
    m--;
    n--;
    while (n >= 0) {
        if (nums1[m] > nums2[n]) {
            nums1[i--] = nums1[m--];
        } else {
            nums1[i--] = nums2[n--];
        }
    }
    return nums1;
}

const nums1 = [1, 2, 3, 0, 0, 0];
const m = 3;
const nums2 = [2, 5, 6];
const n = 3;

nums1.splice(m, nums1.length - m, ...nums2)
console.log(nums1)
// console.log(merge2(nums1, m, nums2, n))