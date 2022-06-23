
// 请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点。传入函数的唯一参数为 要被删除的节点 。

//  输入：head = [4,5,1,9], node = 5
// 输出：[4,1,9]
// 解释：给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
// 链接：https://leetcode.cn/problems/delete-node-in-a-linked-list

/**
 删除链表中的节点的常见的方法是定位到待删除节点的上一个节点，修改上一个节点的 \textit{next}next 指针，
 使其指向待删除节点的下一个节点，即可完成删除操作。
 这道题中，传入的参数 node 为要被删除的节点，无法定位到该节点的上一个节点

 */
// 值要发生变化  指针指向也要发生变化
 const deleteNode =(node)=>{
    node.val = node.next.val;
    node.next =node.next.next;
 }