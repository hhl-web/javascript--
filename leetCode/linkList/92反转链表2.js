/**
 * 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

 说明:
 1 ≤ m ≤ n ≤ 链表长度。
第 1 步：先将待反转的区域反转；
第 2 步：把 pre 的 next 指针指向反转以后的链表头节点，把反转以后的链表的尾节点的 next 指针指向 succ。
 */

const reverseLinkedList =(head)=>{
    let p2=null;
    let p1=head;
    while(p1){
        let temp =p1.next;
        p1.next = p2;
        p2=p1;
        p1=temp;
    }
    return p2;
}
const reverseBetween =(head,left,right)=>{
    let dummy = new ListNode(-1);
    dummy.next = head;
    let pre = dummy;
    // 第 1 步：从虚拟头节点走 left - 1 步，来到 left 节点的前一个节点
    for(let i=0;i<left-1;i++){
        pre =pre.next
    }
    // 第 2 步：从 pre 再走 right - left + 1 步，来到 right 节点
    let rightNode =pre;
    for(let i =0;i<right-left+1;i++){
        rightNode =rightNode.next
    }
    // 第 3 步：切断出一个子链表（截取链表）
    let leftNode =pre.next;
    let curr =rightNode.next;

    pre.next =null;
    rightNode.next =null;

    // 反转链表的子区间
    reverseLinkedList(leftNode);
    
    // 第 5 步：接回到原来的链表中
    pre.next =rightNode;
    leftNode.next =curr;

    return dummyNode.next;

}

