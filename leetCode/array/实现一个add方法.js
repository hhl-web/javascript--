//   add(1)(2,3)(4).value() // 5


const add =function(...args){
    const x =(...args2)=>{
        return add(...args,...args2);
    }
    x.value =()=>{
        return Array.from(args).reduce((cur,pre)=>{
            return cur+pre;
        },0)
    }
    return x;
}

const add2 =(...args)=>{
    let  params = args;
    const next =(...args)=>{
        params =[...params,...args];
        return next;
    }
    next.value =()=>{
        return Array.from(params).reduce((cur,pre)=>{
            return cur+pre
        },0)
    }
    return next;
}

console.log(add2(1)(2,3)(4).value())