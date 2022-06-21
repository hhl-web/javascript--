
/**
 * 给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
你应当 保留 两个分区中每个节点的初始相对位置。

链接：https://leetcode-cn.com/problems/partition-list

 输入：head = [1,4,3,2,5,2], x = 3
 输出：[1,2,2,4,3,5]
 */

const partition = (head, x) => {
    let cur = head;
    let small = new ListNode('s');
    let sp = small;
    let big = new ListNode('b');
    let bp = big;

    while (cur) {
        if (cur.val < x) {
            sp.next = cur;
            sp = sp.next;
        } else {
            bp.next = cur;
            bp = bp.next
        }
        cur = cur.next;
    }

    bp.next =null;
    sp.next=big.next;
    return small.next;
}