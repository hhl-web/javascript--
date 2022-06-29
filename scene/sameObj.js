const deepEqual = (x, y) => {
    if (x === y) {
        return true;
    } else if (typeof x === 'object' && x !== null && typeof y === 'object' && y !== null) {
        if (Object.keys(x).length !== Object.keys(y).length) return false;
        for (const key in x) {
            if (y.hasOwnProperty(key)) {
                const bool = deepEqual(x[key], y[key]);
                if (!bool) {
                    return false
                }
            } else {
                return false;
            }
        }
        return true;
    } else {
        return false
    }
}

// hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性