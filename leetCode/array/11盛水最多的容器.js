

const maxArea = function(height) {
   let n = height.length;
   let left =0,right =n-1;
   let max =0;
   while(left<right){
       let res =Math.min(height[left],height[right]) * (right-left);
       max = Math.max(max,res);
       if(height[left]<height[right]) left++;
       else right--
   }
   return max;
};