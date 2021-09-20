const path = require('path')
const fs = require('fs')
const fsp = fs.promises

function listFilesSync(dirPath) {
    dirPath = path.resolve(dirPath)
    const result = []
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    for (const entry of entries) {
        const fullpath = path.join(dirPath, entry.name)
        if (entry.isDirectory()) {
            result.push(...listFilesSync(fullpath))
        }
        else if (entry.isFile()) {
            result.push(fullpath)
        }
    }
    return result
}

async function listFilesAsync(dirPath) {
    dirPath = path.resolve(dirPath)
    const result = []
    const entries = await fsp.readdir(dirPath, { withFileTypes: true })
    for (const entry of entries) {
        const fullpath = path.join(dirPath, entry.name)
        if (entry.isDirectory()) {
            const files = await listFilesAsync(fullpath)
            result.push(...files)
        }
        else if (entry.isFile()) {
            result.push(fullpath)
        }
    }
    return result
}

function listFilesCallback(dirPath, callback) {
    dirPath = path.resolve(dirPath)
    const result = []
    fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
        if (entries.length === 0) {
            callback([])
            return
        }
        let count = 0
        for (const entry of entries) {
            const fullpath = path.join(dirPath, entry.name)
            if (entry.isDirectory()) {
                count++
                listFilesCallback(fullpath, (files) => {
                    result.push(...files)
                    count--
                    if (count === 0) {
                        callback(result)
                    }
                })
            }
            else if (entry.isFile()) {
                result.push(fullpath)
            }
        }
        if (count === 0) {
            callback(result)
        }
    })
}

console.log(listFilesSync('.'))
listFilesAsync('.').then((files) => {
    console.log(files)
})
listFilesCallback('.', files => {
    console.log(files)
})
