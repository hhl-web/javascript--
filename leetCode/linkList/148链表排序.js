/**
 排序链表
 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
进阶：
    你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
 */
    // var sortList = function (head) {
    //     let array = [];
    //     while (head) {
    //         array.push(head);
    //         head = head.next;
    //     }
    //     array.sort((a, b) => {
    //         return a.val - b.val;
    //     });
    //     head = tail = new ListNode(1);
    //     for(let node of array) {
    //         tail = tail.next = node;
    //         tail.next = null;
    //     }
    //     return head.next;
    // };
    const sortList =function(head){
        if(!head) return null;
        let p = head;
        let s =[];
        while(p){
            let t =p.next;
            p.next =null;
            s.push(p);
            p=t;
        }
        s.sort((a,b)=>a.val-b.val);
        for(let i =0;i<s.length;i++){
            s[i].next =s[i+1];
        };
        return s[0];
    }