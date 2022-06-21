/**
 * 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
 *  输入: 1->1->2
    输出: 1->2
 * 地址 ： https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/
 */

const deleteDuplicates =(head)=>{
    let  p  = head;
    while(p && p.next){
        if(p.val === p.next.val){
            p.next =p.next.next
        }else{
            p = p.next;
        }
    }
    return head;
}