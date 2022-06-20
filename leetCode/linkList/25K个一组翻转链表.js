// 困难

var reverseBetween = function(head, left, right) {

    let dummy = new ListNode(-1)
    dummy.next = head
    let pre = dummy
  
    for(let i = 0 ; i < left -1;i++){
      pre = pre.next
    }
  
    let rightNode = dummy
    console.log('dummy',dummy,right)
    for(let i = 0 ; i < right;i++){
      rightNode = rightNode.next
    }
  
    leftNode = pre.next
    last = rightNode.next
  
    pre.next = null
    rightNode.next =null
  
    rightNode = reverseList(leftNode)
  
    pre.next = rightNode
    leftNode.next = last
  
    return dummy.next
  
  };
  
  
  var reverseList = function(head) {
    let p1 = head
    let p2 = null
    while(p1){
      const tmp = p1.next
      p1.next = p2
      p2 = p1
      p1 = tmp
    }
  
    return p2
  };
  
  
  var reverseKGroup = function(head, k) {
    let p = head
    let len = 1
  
    while(p && p.next){
      p = p.next
      len++
    }
  
    let times = Math.floor(len/k)
    let result = head
    for(let i = 1;i<= times;i++){
      result = reverseBetween(result,(i-1)*k + 1,k*i)
    }
    return result
  
  };
  
  