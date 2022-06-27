/**
 * https://leetcode.cn/problems/next-greater-element-i/
 * nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素。

给你两个 没有重复元素 的数组 nums1 和 nums2 ，下标从 0 开始计数，其中nums1 是 nums2 的子集。

 */

var nextGreaterElement = function (nums1, nums2) {
    let res = [];
    for (let i = 0; i < nums1.length; i++) {
        let curIdx = nums2.indexOf(nums1[i]) + 1;
        const curItem = nums1[i];
        while (curIdx <= nums2.length) {
            if (curIdx === nums2.length) {
                res.push(-1);
                break;
            }
            if (nums2[curIdx] > curItem) {
                res.push(nums2[curIdx]);
                break;
            } else {
                curIdx++;
            }
        }

    }
    return res;
};