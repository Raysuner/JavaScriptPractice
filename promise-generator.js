function getValue(n, time = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(n)
        }, time)
    })
}

function * generator() {
    console.log(1)
    let x = yield getValue(2)
    console.log(3)
    x = yield getValue(4)
}


function run(generator) {
    let iterable = generator()
    let gene = iterable.next()
    function tick() {
        if (gene.done === false) {
            gene.value.then(
                val => {
                    console.log(val);
                    gene = iterable.next(val)
                    tick()
                },
                reason => {
                    console.log(reason.message)
                    gene = iterable.throw(reason)
                    tick()
                }
            )
        }
    }
    tick() // 第一次就算是传值也没有作用
}

run(generator)