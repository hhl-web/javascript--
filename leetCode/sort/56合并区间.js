/**
 * 
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/merge-intervals
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

var merge = function (intervals) {
    if (intervals.length === 0) return [];
    intervals.sort((a, b) => a[0] - b[0]);
    const temp = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        const last = temp[temp.length - 1];
        const cur = intervals[i];
        if (last[1] >= cur[0]) {
            last[1] = Math.max(last[1], cur[1])
        } else {
            temp.push(cur)
        }
    }
    return temp;
};