function getValue(n, ms = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(n)
        }, ms)
    })
}

function * generator() {
    console.log(1)
    let x = yield getValue(2, 1000)
    console.log(x)
    x = yield getValue(3, 2000)
    console.log(x)
    return 4
}


function run(generator) {
    return new Promise((resolve, reject) => {
        let iterable = generator()
        let gene = iterable.next()
        tick()

        function tick() {
            if (gene.done === false) {
                gene.value.then(
                    value => {
                        try {
                            gene = iterable.next(value)
                            tick()
                        } catch (err) {
                            reject(err)
                        }
                    },
                    reason => {
                        try {
                            gene = iterable.throw(reason)
                            tick()
                        }
                        catch (err) {
                            reject(err)
                        }
                    }
                )
            }
            else {
                resolve(gene.value)
            }
        }
    })
}

run(generator).then((val) => {
    console.log(val)
    console.log('generator is done');
})