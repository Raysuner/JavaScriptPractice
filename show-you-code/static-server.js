const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const http = require('http')
const mime = require('mime')
const groupBy = require('lodash/groupBy')
const open = require('open')
const argvs = require('minimist')(process.argv.slice(2));

const port = argvs.port || argvs.p || 5000
const cors = argvs.cors || argvs.c || false
const dir = argvs._[0] || '.'
const staticDir = path.resolve(dir)
const openBrowser = argvs.open || argvs.o || false

console.log(argvs)

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET') {
        const queryUrl = decodeURIComponent(req.url) // 处理URL中带有中文
        const newUrl = new URL(queryUrl, 'http://127.0.0.1')
        const pathname = newUrl.pathname
        const search = newUrl.search
        const fullPath = path.join(staticDir, pathname) // 处理query
        const tailPath = fullPath.slice(staticDir.length)
        const tailPaths = tailPath.split(path.sep)
        if (tailPaths.some(it => it.startsWith('.'))) { // 禁止访问隐藏文件
            res.writeHead(403, {
                'Content-Type': 'text/html; charset=UTF-8'
            })
            res.end()
            return
        }
        let stat = null
        try {
            stat = await fsp.stat(fullPath)
            if (stat.isDirectory()) {
                try { // 如果文件夹存在index.html,那么返回index.html,否则返回文件列表即可
                    const indexPath = path.join(fullPath, 'index.html')
                    const indexData = await fsp.readFile(indexPath)
                    if (cors) {
                        res.setHeader('Access-Control-Allow-Origin', '*')
                    }
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })
                    res.end(indexData)
                } catch (e) {
                    if (e.code === 'ENOENT') {
                        if (!pathname.endsWith('/')) {
                            res.writeHead(301, {
                                Location: pathname + '/' + search
                            })
                            console.log('===========redirect============')
                            res.end()
                            return
                        }
                        const entries = await fsp.readdir(fullPath, { withFileTypes: true })
                        const filteredEntries = entries.filter(entry => !entry.name.startsWith('.'))
                        const groupEntries = groupBy(filteredEntries, entry => {
                            if (entry.isDirectory()) {
                                return 'dirs'
                            }
                            else if(entry.isFile()){
                                return 'files'
                            }
                        })
                        groupEntries.dirs = (groupEntries.dirs || []).sort()
                        groupEntries.files = (groupEntries.files || []).sort()
                        const sortedEntries = groupEntries.dirs.concat(groupEntries.files)
                        res.writeHead(200, {
                            'Content-Type': 'text/html; charset=utf-8'
                        })
                        res.write(`
                            <div>
                                <header><h1>${pathname}</h1></header>
                                <div><a href='..'>../</a></div>
                                ${sortedEntries.map(entry => {
                                    const fileLink = path.posix.join(pathname, entry.name)
                                    const fileName = entry.name
                                    const slash = entry.isDirectory() ? '/' : ''
                                    return `<div><a href='${fileLink}'>${fileName}${slash}</a></div>`
                                }).join('')}
                                <footer><h2>Node.js ${process.version} http static server ${req.socket.remoteAddress}: ${port}</h2></footer>
                            </div>
                        `)
                    }
                    else {
                        throw e
                    }
                }
            }
            else if (stat.isFile()) {
                const fileType = mime.getType(fullPath)
                const fileContent = await fsp.readFile(fullPath)
                if (cors) {
                    res.setHeader('Access-Control-Allow-Origin', '*')
                }
                res.writeHead(200, {
                    'Content-Type': `${fileType}; charset=utf-8`, // +的时候会导致文件下载
                })
                res.write(`${fileContent}`)
            }
            res.end()
        } catch (e) {
            if (e.code === 'ENOENT') {
                console.error(`${pathname} is not found`)
                res.writeHead(404)
                res.end('404 NOT FOUND')
            }
        }
    }
})

server.listen(port, () => {
    if (openBrowser) {
        open(`http://127.0.0.1:${port}/`)
    }
    console.log(`listening on port: ${port}`);
})