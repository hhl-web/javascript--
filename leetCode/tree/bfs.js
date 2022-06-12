const tree = {
    val: 'a',
    children: [
        {
            val: 'b',
            children: [
                {
                    val: 'd',
                    children: [],
                },
                {
                    val: 'e',
                    children: [],
                }
            ],
        },
        {
            val: 'c',
            children: [
                {
                    val: 'f',
                    children: [],
                },
                {
                    val: 'g',
                    children: [],
                }
            ],
        }
    ],
};


const bfs =(tree)=>{
    const stack =[tree];
    while(stack.length){
        const n = stack.pop();
        n.children.forEach((c=>{
            stack.unshift(c)
        }))
    }
}
