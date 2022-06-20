/*
/*
给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。

输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL
解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL
*/

const rotateRight =(head,k)=>{
    if(head === null || head.next ===null) return head;

    // 1. 找到链表的长度，可以得出最终旋转的情况， k%len
    // ps: 当k===len时，链表相当于没有移动
    let len = 1, p =head;
    while(p && p.next){
        len++;
        p =p.next;
    }
    let m = k % len;
    // k是0，或者是len的倍数时，链表旋转到原来的位置，可直接返回。
    if(m === 0) return head;
    // 设置快慢指针，将链表分成两段。
    let slow =head,fast =head;
    while(m--){
        fast =fast.next;
    }
    while(fast && fast.next){
        slow =slow.next;
        fast =fast.next;
    }
    let r = slow.next;
    slow.next =null;
    fast.next =head;
    return r;
}