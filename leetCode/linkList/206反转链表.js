/*
反转一个单链表。

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
 */

const reverseList = (head) => {
    let p1 = head;
    let p2 = null;
    while (p1) {
        const temp = p1.next;
        p1.next = p2;

        p2 = p1;
        p1 = temp;
    }
    return p2;
}