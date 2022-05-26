
import ts from 'rollup-plugin-typescript2'
import resolvePlugin from '@rollup/plugin-node-resolve'
import path from 'path'

const packageDir = path.resolve(__dirname, 'packages')
const packagesDir = path.resolve(packageDir, process.env.TARGET)
const resolve = p => path.resolve(packagesDir, p)
const pkg = require(resolve('package.json'))
const buildOptions = pkg.buildOptions
const name = path.basename(packagesDir)

const outputConfig = {
    "esm-bundler": {
        file:resolve(`dist/${name}.esm-bundler.js`),
        format:'es'
    },
    "cjs": {
        file:resolve(`dist/${name}.cjs.js`),
        format:'cjs'
    },
    "global": {
        file:resolve(`dist/${name}.global.js`),
        format:'iife'
    }
}

export default buildOptions.formats.map(format => createConfig(outputConfig[format]))

function createConfig(output) {
    output.name = buildOptions.name
    output.sourcemap = true
    return {
        input:resolve('src/index.ts'),
        output,
        plugins:[
            ts({
                tsconfig:path.resolve(__dirname, 'tsconfig.json')
            }),
            resolvePlugin()
        ]
    }
}

