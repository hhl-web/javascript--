// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

/**
让 cur 指向链表的第 n + 1 个节点，如果 cur 为 null，那么 head 即为要删除的节点。
让 beforeLastN 指向 head。假定 cur 为链表的尾节点，那么 beforeLastN 后的第一个节点为目标删除节点。
接下来只需同时向后移动 beforeLastN 和 cur 直到 cur 真正指向链表尾节点即可。
 */
const removeNthFromEnd = (head, n) => {
    if (!head.next) return null;

    let fast = head;
    let slow = head;
    while (n > 0) {
        if (!fast.next) break;
        fast = fast.next;
        n--
    }
    if (n > 0) {
        return head.next
    }

    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return head;
}