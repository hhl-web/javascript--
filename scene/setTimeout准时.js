// setTimeout 会返回一个整数，表示定时器的编号，同时 可以通过该编号来取消这个定时器
// 这个编号的意思就是说，我虽然通过 setTimeout 设置了在指定时间后执行代码，
// 但是在没到时间之前是可以反悔的，反悔的方式是 通过 clearTimeout() 去取消这个定时器。


// setTimeout(() => {
//     console.log(1);
//   }, 20);
// for (let i = 0; i < 90000000; i++) { } 
/* setTimeout并不会20s就打印1，而是80ms打印了1,因为for循环执行需要时间的 */

// setTimeout(() => {
//     console.log(2);
// }, 0);

/**
 * for循环执行花费的时间大概是80ms
 * 如果没有for循环，那么执行的顺序是 2,1
 * 加上for循环，那么执行的顺序是1,2
 * 
 * setTimeout 设置的回调任务是 按照顺序添加到延迟队列里面的
 */

let form={};

function timer(){
    let start =+new Date().getTime();
    let count =1;
    let speed =50;
    function instance(){
        let ideal = count * speed;  //理想值
        real = (+new Date().getTime() -start);  //真实值
        count++;

        form.ideal =ideal;
        form.real =real;
        let diff = real-ideal;
        form.diff =diff;

        console.log(form);
        window.setTimeout(function() { instance(); }, speed);
    }

    window.setTimeout(function(){
        instance()
    },speed)
}

timer();