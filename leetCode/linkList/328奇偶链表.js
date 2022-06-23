/**
 * 
 * 输入 1->2->3->4->5->null
 * 输出 1->3->5->2->4->null
 */
var oddEvenList = function (head) {
    if (head === null) return head;
    let evenHead = head.next;
    let old = head;
    let even = evenHead;
    while (even && even.next) {
        old.next = even.next;
        old = old.next;
        even.next = old.next;
        even = even.next;
    }
    old.next = evenHead;
    return old;
};

/**
 * old -》next 指向哪个
 * even -》next 指向哪个
 * old 和 even t如何 移动 指针
 */


