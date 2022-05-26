// node 解析目录
import fs from 'fs'
import { execa } from 'execa'

const dirs = fs.readdirSync('packages').filter(file => fs.statSync(`packages/${file}`).isDirectory())

async function build(target){
    await execa('rollup',['-cw','--environment',`TARGET:${target}`],{ stdio: 'inherit'})
}

async function runParallel(dirs, itemFn){
    const result = []
    for(let item of dirs){
        result.push(itemFn(item)) 
    }
    return Promise.all(result)
}
runParallel(dirs, build).then(_ => {
    console.log('成功')
})