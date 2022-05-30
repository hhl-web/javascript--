// 限制一次买卖
function maxProfit1(prices){
   let min = Number.MAX_VALUE;
   let max =0;
   for(let i=0;i<prices.length;i++){
       if(prices[i]<min){
           min= prices[i]
       }else if(prices[i]-min>max){
           max =prices[i]-min
       }
   }
   return max
}

function maxProfit2(prices){
    let min = Number.MAX_VALUE;
    let max =0;
    for(let i=0;i<prices.length;i++){
        min= Math.min(prices[i],min);// 第i天之前的最低股票价格
        max =Math.max(max,prices[i]-min);// 第i天时股票可以获取的最大利润
    }
    return max
 }

