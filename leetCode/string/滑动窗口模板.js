const minWindow = function(s,t){
    let window ={};
    let left =0;
    let right =0;
    let res =null;
    let need ={};

    while(right<s.length){
        // 取出右边
        let r = s[right];
        right++;
        window[r] =(window[r]|| 0)+1;
        // 条件判断


         // 不满足条件判断 left++
        // while(window[r] > 1){
        //   let l = s[left]
        //   left++
        //   window[l]--
        // }
    }
}


let str ='elephant';
let  str1 =str.slice();
str1+='5'
console.log(str1,str);

let animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

let  animals1 =animals.slice();
animals1.push('0000')
console.log(animals,animals1)