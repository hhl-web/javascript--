
ES7
## includes || indexOf
(()=>{
      let arr=[1,2,3,NaN];
      // 查找2是否在arr数组中
      if(arr.includes(2)){
        console.log('找到了！');
      }
      // 从索引值为3开始查找
      if(!arr.includes(2,3)){
        console.log('不存在');
      }
      // 可以查找NaN
      console.log(arr.includes(NaN));
      // 不可查找NaN
      console.log(arr.indexOf(NaN)!==-1);
})();

## 指数函数的中缀表示法

let squared= 2 ** 2;
let cubed= 2 ** 3;  //Math.pow(2,3);

let a=2;
a**=2;
let b=3;
b**=3;  //b=b*b*b;


## this的执行 隐式指向丢失

function func() {
  console.log(this.a);
}
var a = 2;
var o = { a: 3, func: func };
var p = { a: 4 };
o.func(); //>> 3
(p.func = o.func)();  //>>2

p.func(); //>>4
      