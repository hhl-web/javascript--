/**
 * 输入: temperatures = [73,74,75,71,69,72,76,73]
输出: [1,1,4,2,1,1,0,0]
 */
// var dailyTemperatures = function(temperatures) {
//     let res =[];
//     for(let i=0;i<temperatures.length;i++){
//         const item = temperatures[i];
//         let eIdx = i+1;
//         while(eIdx<=temperatures.length){
//             if(eIdx===temperatures.length){
//                 res.push(0);
//                 break;
//             }
//             if(item<temperatures[eIdx]){
//                 res.push(eIdx-i);
//                 break;
//             }
//             eIdx++;
//         }
//     }
//     return res;
// };

// let temperatures = [73,74,75,71,69,72,76,73];
// console.log(dailyTemperatures(temperatures))



var dailyTemperatures = function(T) {

    const stack = []
    const result = []
    for(let i = 0 ;i < T.length ;i++){
      result[i] = 0
      while(stack.length > 0 && stack[stack.length - 1].value < T[i]){
        result[stack[stack.length - 1].index] = i - stack[stack.length - 1].index
        stack.pop()
  
      }
  
      stack.push({
        value:T[i],
        index:i
      })
    }
  
    return result
  };
  
  console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
  