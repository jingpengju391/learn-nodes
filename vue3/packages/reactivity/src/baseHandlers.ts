import { extend, hasChanged, hasOwn, isArray, isIntegerKey, isObject } from "@vue/shared"
import { reactive, readonly } from "."
import { track, trigger } from "./effect"

const get = createGetter()
const shallowReactiveGet = createGetter(false, true)
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

const set = createSetter()
const shallowSet = createSetter(true)
export const mutableHandlers = {
    get,
    set
}
export const shallowReactiveHandlers = {
    get: shallowReactiveGet,
    set: shallowSet
}

const readonlySet = {
    set(target, key){
        console.warn(`cannot set ${JSON.stringify(target)} on key ${key} failed!`)
    }
}
export const readonlyHandlers = extend({
    get: readonlyGet,
}, readonlySet)
export const shallowReadonlyHandlers = extend({
    get: shallowReadonlyGet
}, readonlySet)



function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, reactiver){

        const result = Reflect.get(target, key, reactiver)
        
        if(!isReadonly) {
            track(target,'get',key)
        }

        if(shallow) return result

        if(isObject(result)){
            return isReadonly ? readonly(result) : reactive(result)
        }

        return result
    }
}

function createSetter(shallow = false) {
    return function set(target, key, value, reactiver){
        const oldValue = target[key]
        const hasKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key)
        const result = Reflect.set(target, key, value, reactiver)
        if(!hasKey){
            trigger(target,'add',key,value,oldValue)
        }else if(hasChanged(oldValue, value)){
            trigger(target,'set',key,value,oldValue)
        }
        return result
    }
}