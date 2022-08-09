const api = async () => {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000)
    })
    return {
        a: 1
    }
}

const test = async () => {
    await setTimeout(() => { console.log('c:3') }, 1000);
    return {
        b: 2
    }
}

api().then((res) => {
    console.log(res)
});
test().then(res => {
    console.log(res)
})