export function isObject(value){
    return typeof value === 'object' && value !== null
}

export function extend(...args){
    return Object.assign({}, ...args)
}

export const isArray = Array.isArray

export function hasChanged(oldValue, newValue) {
    return oldValue !== newValue
}

export function isIntegerKey(key){
    return parseInt(key) + '' === key
}

export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)