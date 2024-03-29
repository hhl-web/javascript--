/*
 * @Date: 2022-05-15 17:27:02
 * @LastEditTime: 2022-08-26 14:09:32
 * @FilePath: /works/js/javascript/scene/dom.js
 * @Description: 如何遍历dom数据 
 */
// dfs 纵向维度去遍历
function traversal1(node) {
    if (node && node.nodeType === 1) {
        console.log(node.nodeName)
    }
    const { childNodes } = node;
    for (let i = 0; i < childNodes.length; i++) {
        traversal1(childNodes[i])
    }
}

// bfs 横向维度去遍历
function traversal2(node) {
    const stack = [node];
    while (stack.length > 0) {
        const n = stack.shift();
        if (n && n.nodeType === 1) {
            console.log(n.nodeName);
            const { childNodes } = n;
            stack.push(...childNodes)
        }

    }
}