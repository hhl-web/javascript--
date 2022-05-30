// 是不是回文字符串
const isPalindrome =(s)=>{
    let i =0;
    let j =s.length-1;
    while(i<j){
        if(s[i]!==s[j]) return false;
        i++;
        j--;
    }
    return true;
}

// 暴力法
const countSubstrings =(s)=>{
    let count =0;
    for(let i=0;i<str.length;i++){
        for(let j=i;j<s.length;j++){
            if(isPalindrome(s.substring(i,j+1))){
                count++;
            }
        }
    }
    return count;
}


//动态规划
const countSubstrings2 =(s)=>{
    let dp =[];
    let count=0
    for(let i= 0;i<s.length;i++){
        dp[i] =[];
        for(let j =0 ;j<s.length;j++){
            dp[i][j] =0;
        }
    }
    for(let j= 0;j<s.length;j++){
        for(let i=0;i<=j;i++){
            if (j == i) {
                dp[i] = true;
                count++;
              } else if (j - i == 1 && s[i] == s[j]) {
                dp[i] = true;
                count++;
              } else if (j - i > 1 && s[i] == s[j] && dp[i + 1]) {
                dp[i] = true;
                count++;
              } else {
                dp[i] = false;
              }
        }
    }
    return count;
}

console.log(countSubstrings2('aaa'))