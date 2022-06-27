var minWindow = function (s, t) {
    let window = {};
    let right = 0;
    let left = 0;
    let res = null;
    let need = {};

    for (let c of t) {
        if (!need[c]) need[c] = 1;
        else need[c]++;
    }

    let len = Object.keys(need).length;
    let valid = 0;
    while (right < s.length) {
        const r = s[right];
        right++;
        window[r] = (window[r] || 0) + 1;
        if (need[r] && need[r] === window[r]) {
            valid++;
        }

        while (valid === len) {
            let splitString = s.slice(left, right);
            if (!res) {
                res = [splitString, splitString.length];
            } else {
                if (res[1] > splitString.length) {
                    res = [splitString, splitString.length]
                }
            }
            let l = s[left];
            left++;
            window[l]--;
            if (need[l] && window[l] < need[l]) {
                valid--
            }
        }

    }
    return res ? res[0] : ''
};

console.log(minWindow("ADOBECODEBANC", 'ABC'));