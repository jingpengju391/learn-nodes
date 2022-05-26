import { isObject } from "@vue/shared"
import { mutableHandlers, readonlyHandlers, shallowReactiveHandlers, shallowReadonlyHandlers } from "./baseHandlers"


export function reactive(target){
    return createReactiveObject(target, false, mutableHandlers)
}

export function shallowReactive(target){
    return createReactiveObject(target, false, shallowReactiveHandlers)
}


export function readonly(target){
    return createReactiveObject(target, true, readonlyHandlers)
}


export function shallowReadonly(target){
    return createReactiveObject(target, true, shallowReadonlyHandlers)
}

const reactiveMap = new WeakMap()
const readonlyMap = new WeakMap()
function createReactiveObject(target, isReadonly, baseHandlers){
    if(!isObject(target)) return target
    /**
     * target 创建的目标对象
     * isReadonly 当前对象是否是仅读
     * baseHandlers 针对不同方式创建代理对象
     */
    const proxyMap = isReadonly ? readonlyMap : reactiveMap
    const existProxy = proxyMap.get(target)
    if(existProxy) return existProxy
    const proxy = new Proxy(target, baseHandlers)
    proxyMap.set(target, proxy)
    return proxy
}