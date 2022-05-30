/**
 * F(0) = 0;F(1)=1
 * F(n) =F(n-1)+F(n-2) n>1
 */
function fib(n) {
    if (n < 2) {
        return n;
    }
    let p = 0, q = 0, r = 1;
    for (let i = 2; i <= n; i++) {
        p = q;
        q = r;
        r = p + q;
    }
    return r;
}

console.log(fib(3))