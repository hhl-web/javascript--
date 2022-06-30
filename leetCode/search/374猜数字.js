
var guessNumber = function (n) {
    let low = 1;
    let hight = n;
    while (low <= hight) {
        let mid = Math.floor((low+hight) / 2)
        const res = guess(mid)
        if (mid === 0) {
            return mid
        } else if (res === 1) {
            low = mid + 1
        } else {
            hight = mid + 1
        }
    }
};