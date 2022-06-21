
// 给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中 没有重复出现 的数字。

// 示例 1:
// 输入: 1->2->3->3->4->4->5
// 输出: 1->2->5
// 示例 2:

// 输入: 1->1->1->2->3
// 输出: 2->3

// 链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii



const deleteDuplicates =(head)=>{
    let dumyNode = new ListNode(0);
    dumyNode.next =head;

    if(head===null) return null;
    let cur =head,pre =dumyNode;

    while(cur && cur.next){
        if(cur.val === cur.next.val){
            while(cur.next!== null && cur.val === cur.next.val){
                cur =cur.next;
            }
            pre.next =cur.next;
            cur =cur.next;
        }else{
            cur =cur.next;
            pre =pre.next
        }
    }
    return dumyNode.next;
}