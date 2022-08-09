// setTimeout 会返回一个整数，表示定时器的编号，同时 可以通过该编号来取消这个定时器
// 这个编号的意思就是说，我虽然通过 setTimeout 设置了在指定时间后执行代码，
// 但是在没到时间之前是可以反悔的，反悔的方式是 通过 clearTimeout() 去取消这个定时器。

// 案例一
// setTimeout(() => {
//     console.log(1);
//   }, 20);
// for (let i = 0; i < 90000000; i++) { } 
/* setTimeout并不会20s就打印1，而是80ms打印了1,因为for循环执行需要时间的 */

// setTimeout(() => {
//     console.log(2);
// }, 0);

// 案例二
// setTimeout(() => {
//     console.log(1);
// }, 0);
// for (let i = 0; i < 10; i++) { }
// /* setTimeout并不会0s就打印1，而是80ms打印了1,因为for循环执行需要时间的 */

// setTimeout(() => {
//     console.log(2);
// }, 20);
/**
 *  for循环执行花费的时间大概是80ms
 *  如果没有for循环，那么执行的顺序是 2,1
 *  加上for循环，那么执行的顺序是1,2
 *  如果循环值变为9，那么循环所需要的时间小于 20  ，最后输出的结果是2,1
 *  setTimeout 设置的回调任务是 按照顺序添加到延迟队列里面的，
 *  当执行完一个任务之后，ProcessDelayTask 函数会根据发起时间和延迟时间来计算出到期的任务
 *  然后依次执行 这些到期的任务。
 *  在执行完前面的任务之后，上面例子的两个 setTimeout 都到期了，那么按照顺序执行就是打印 1 和 2。
 *  所以在这个场景下，setTimeout 就显得不那么可靠了。
 *  链接：https://juejin.cn/post/6982081539249012766

 * 案例二无论循环花多少时间 都是输出1,2
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