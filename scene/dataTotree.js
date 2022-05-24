
function dataToTree(source) {
    if (!Array.isArray(source)) return;
    // 根据id做映射表,数组中的对象引用地址没有发生改变
    const mapObj = source.reduce((pre, cur) => {
        pre[cur.id] = cur;
        return pre;
    }, {});
    const result = source.reduce((pre, cur) => {
        const parentId = cur.parentId;
        const parent = mapObj[parentId];
        if (parent) {
            parent.children ? parent.children.push(cur) : parent.children = [cur];
        } else if (parentId === 0) {
            // 为根的情况
            pre.id = 0;
            pre.children ? pre.children.push(cur) : pre.children = [cur];
        }
        return pre;
    }, {})
    console.log(mapObj)
    return result;

}
// 源数据
const list = [
    {
        id: 19,
        parentId: 0,
    },
    {
        id: 18,
        parentId: 16,
    },
    {
        id: 17,
        parentId: 16,
    },
    {
        id: 16,
        parentId: 0,
    },
]

// 转换后的结果
const tree = {
    id: 0,
    children: [
        {
            id: 19,
            parentId: 0,
        },
        {
            id: 16,
            parentId: 0,
            children: [

                {
                    id: 18,
                    parentId: 16,
                },
                {
                    id: 17,
                    parentId: 16,
                },
            ],
        },
    ],
}
console.log(dataToTree(list))



function toTree(source){
    if(!Array.isArray(source)) return [];
    const mapObj =source.reduce((pre,cur)=>{
        pre[cur.id] =cur;
        return pre
    },{});
    return source.reduce((arr,cur)=>{
        const pid = cur.pid;
        const parent = mapObj[pid];
        if(parent){
            parent.children ? parent.children.push(cur): parent.children=[cur];
        }else if(!pid){
            arr.push(cur);
        }
        return pre;
    },[])
}

// 源数据
const arr = [{
    id: 0,
    data: 1,
  }, {
    pid: 0,
    id: 1,
    data: 2,
  }, {
    pid: 0,
    id: 2,
    data: 3,
  }, {
    pid: 2,
    id: 3,
    data: 4,
}]

console.log(toTree(arr));

const tree2 = [{
    id: 0,
    data: 1,
    children: [
        {
            pid: 0,
            id: 1,
            data: 2,
        },

        {
            pid: 0,
            id: 2,
            data: 3,
            children: [
                {
                    pid: 2,
                    id: 3,
                    data: 4
                }
            ]
        },
    ]
}]