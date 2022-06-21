
/**
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 请你将两个数相加，并以相同形式返回一个表示和的链表。
 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 l1 = [2,4,3], l2 = [5,6,4]
 输出：[7,0,8]
 */
const addTwoNums = function (l1, l2) {
    const l3 = new ListNode(0);
    let p1 = l1;
    let p2 = l2;
    let p3 = l3;
    let carry = 0;
    while (p1 || p2) {
        const v1 = p1 ? p1.val : 0;
        const v2 = p2 ? p2.val : 0;
        const val = v1 + v2 + carry;
        console.log(v1,v2,val)
        carry = Math.floor(val % 10);
        p3.next = new ListNode(val % 10)
        if (p1) p1 = p1.next;
        if (p2) p2 = p2.next;
        p3 = p3.next;
        console.log(p3)
    }
    if (carry) {
        p3.next = new ListNode(carry);
    }
    return l3.next;
}

console.log(addTwoNums([2, 4, 3], [5, 6, 4]))