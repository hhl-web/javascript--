/**
 * 
 * @param {*} head 
 * @returns 
 * https://leetcode.cn/problems/linked-list-cycle-ii/
 */
var detectCycle = function(head) {
    const visited = new Set();
    while (head !== null) {
        if (visited.has(head)) {
            return head;
        }
        visited.add(head);
        head = head.next;
    }
    return null;
};
