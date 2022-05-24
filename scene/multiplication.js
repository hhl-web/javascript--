function multiplicationCatch() {
    const cache = {};
    return function multiplication(...args) {
        const key = JSON.stringify(args.sort((a, b) => a - b));
        if (cache[key]) {
            return cache[key];
        }
        return cache[key] = args.reduce((mon, cur) => {
            return mon * cur;
        }, 1);
    }
}

let multiplicationCatchInstance = multiplicationCatch()

console.log(multiplicationCatchInstance(1, 2, 3));

console.log(multiplicationCatchInstance(1, 3, 2))