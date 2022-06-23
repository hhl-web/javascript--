var getIntersectionNode1 = function (headA, headB) {
    if (headA === headB) return headA;

    let headAArr = [];
    let headBArr = [];
    let pa = headA;
    let pb = headB;
    while (pa) {
        headAArr.push(pa)
        pa = pa.next;
    }

    while (pb) {
        headBArr.push(pb)
        pb = pb.next;
    }
    headAArr.reverse();
    headBArr.reverse();

    let min = headAArr.length > headBArr.length ? headBArr.length : headA.length;
    let same = null;
    for (let i = 0; i < min; i++) {
        if (headAArr[i] !== headBArr[i]) {
            same = headAArr[i - 1];
            break;
        }
    }
    return same;
};

// 高效方法

var getIntersectionNode2 = (headA, headB) => {
    let a = headA, b = headB;
    while (a != b) {
        a = a != null ? a.next : headB;
        b = b != null ? b.next : headA;
    };
    return a;
}