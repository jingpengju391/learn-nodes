import { isArray, isIntegerKey } from "@vue/shared"

export function effect(fn, options:any = {}){
    const effect = createReactiveEffect(fn, options)

    !options.lazy && effect()

    return effect
}
const targetMap = new WeakMap()
export function track(target,type,key){

    if(activeEffect === undefined) return

    let depsMap = targetMap.get(target)
    if(!depsMap) targetMap.set(target, (depsMap = new Map()))

    let dep = depsMap.get(key)
    if(!dep) depsMap.set(key, (dep = new Set()))

    !dep.has(activeEffect) && dep.add(activeEffect)

}

export function trigger(target,type,key,newValue,oldValue?){

    const depsMap = targetMap.get(target)
    if( !depsMap ) return

    const effects = new Set()
    function addEffect(effectSet){
        effectSet && effectSet.forEach(effect => effects.add(effect))
    }

    if(isArray(target) && key === 'length'){
        depsMap.forEach((dep, key) => {
            key > newValue || key === 'length' && addEffect(dep)
        })
    } else {
        addEffect(depsMap.get(key))
        switch (type){
            case 'add':
                isArray(target) && isIntegerKey(key) && addEffect(depsMap.get('length'))
        }
    }

    effects.forEach((effect:any) => effect())

}

let activeEffect
let id = 0
const effectStack = []
function createReactiveEffect(fn, options){
    const effect = function reactiveEffect() {
        try{
            effectStack.push(effect)
            activeEffect = effect
            return fn()
        }finally{
            effectStack.pop()
            activeEffect = effectStack.at(-1)
        }
    }
    effect.id = id++
    effect.__isEffect = true
    effect.options = options
    effect.deps = []
    return effect
}