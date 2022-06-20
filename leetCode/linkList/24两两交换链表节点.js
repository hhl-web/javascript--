// 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。
// 你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
// 输入：head = [1,2,3,4]
// 输出：[2,1,4,3]

const  swapPairs =(head)=>{
    const dummy =new ListNode(0);
    dummy.next =head;
    let prev =dummy;

    while(head && head.next){
        const next = head.next;
        head.next = next.next;
        next.next = head;
        prev.next = next;

        prev = head;
        prev.next = next
    }
    return dummy.next;
}
