/*
 * @Author: hhl-web huanghuilin4177@100.me
 * @Date: 2022-05-15 17:27:02
 * @LastEditors: hhl-web huanghuilin4177@100.me
 * @LastEditTime: 2022-05-15 21:24:38
 * @FilePath: /works/js/javascript/scene/dom.js
 * @Description: 如何遍历dom数据
 * 
 * Copyright (c) 2022 by hhl-web huanghuilin4177@100.me, All Rights Reserved. 
 */

function traversal1(node) {
    if (node && node.nodeType === 1) {
        console.log(node.nodeName)
    }
    const { childNodes } = node;
    for (let i = 0; i < childNodes.length; i++) {
        traversal(childNodes[i])
    }
}


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