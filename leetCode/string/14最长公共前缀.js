/**
 * 编写一个函数来查找字符串数组中的最长公共前缀。

 如果不存在公共前缀，返回空字符串 ""。


 示例 1：

 输入：strs = ["flower","flow","flight"]
 输出："fl"

 链接：https://leetcode-cn.com/problems/longest-common-prefix
 */

 const longestCommonPrefix =(strs)=>{
    const helper =(str1,str2)=>{
        let res ='';
        let p1= 0;
        let p2 =0;
        while(p1<=str1.length-1 && p2<=str2.length-1){
            if(str1[p1]===str2[p2]){
                res+=str1[p1];
                p1++;
                p2++;
            }else{
                break;
            }
        }
        return res;
    }
    let str1 = strs[0];
    let str2 =strs[1];
    let res = helper(str1,str2);
    for(let i=2;i<strs.length;i++){
        res = helper(res,strs[i])
    }
    return res;
 }  



console.log(longestCommonPrefix(["flower","flow","flight"]))