'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isObject(value) {
    return typeof value === 'object' && value !== null;
}
function extend(...args) {
    return Object.assign({}, ...args);
}
const isArray = Array.isArray;
function hasChanged(oldValue, newValue) {
    return oldValue !== newValue;
}
function isIntegerKey(key) {
    return parseInt(key) + '' === key;
}
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

function effect(fn, options = {}) {
    const effect = createReactiveEffect(fn, options);
    !options.lazy && effect();
    return effect;
}
const targetMap = new WeakMap();
function track(target, type, key) {
    if (activeEffect === undefined)
        return;
    let depsMap = targetMap.get(target);
    if (!depsMap)
        targetMap.set(target, (depsMap = new Map()));
    let dep = depsMap.get(key);
    if (!dep)
        depsMap.set(key, (dep = new Set()));
    !dep.has(activeEffect) && dep.add(activeEffect);
}
function trigger(target, type, key, newValue, oldValue) {
    const depsMap = targetMap.get(target);
    if (!depsMap)
        return;
    const effects = new Set();
    function addEffect(effectSet) {
        effectSet && effectSet.forEach(effect => effects.add(effect));
    }
    if (isArray(target) && key === 'length') {
        depsMap.forEach((dep, key) => {
            key > newValue || key === 'length' && addEffect(dep);
        });
    }
    else {
        addEffect(depsMap.get(key));
        switch (type) {
            case 'add':
                isArray(target) && isIntegerKey(key) && addEffect(depsMap.get('length'));
        }
    }
    effects.forEach((effect) => effect());
}
let activeEffect;
let id = 0;
const effectStack = [];
function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        try {
            effectStack.push(effect);
            activeEffect = effect;
            return fn();
        }
        finally {
            effectStack.pop();
            activeEffect = effectStack.at(-1);
        }
    };
    effect.id = id++;
    effect.__isEffect = true;
    effect.options = options;
    effect.deps = [];
    return effect;
}

const get = createGetter();
const shallowReactiveGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);
const set = createSetter();
const shallowSet = createSetter(true);
const mutableHandlers = {
    get,
    set
};
const shallowReactiveHandlers = {
    get: shallowReactiveGet,
    set: shallowSet
};
const readonlySet = {
    set(target, key) {
        console.warn(`cannot set ${JSON.stringify(target)} on key ${key} failed!`);
    }
};
const readonlyHandlers = extend({
    get: readonlyGet,
}, readonlySet);
const shallowReadonlyHandlers = extend({
    get: shallowReadonlyGet
}, readonlySet);
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, reactiver) {
        const result = Reflect.get(target, key, reactiver);
        if (!isReadonly) {
            track(target, 'get', key);
        }
        if (shallow)
            return result;
        if (isObject(result)) {
            return isReadonly ? readonly(result) : reactive(result);
        }
        return result;
    };
}
function createSetter(shallow = false) {
    return function set(target, key, value, reactiver) {
        const oldValue = target[key];
        const hasKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
        const result = Reflect.set(target, key, value, reactiver);
        if (!hasKey) {
            trigger(target, 'add', key, value);
        }
        else if (hasChanged(oldValue, value)) {
            trigger(target, 'set', key, value);
        }
        return result;
    };
}

function reactive(target) {
    return createReactiveObject(target, false, mutableHandlers);
}
function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers);
}
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers);
}
function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers);
}
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
function createReactiveObject(target, isReadonly, baseHandlers) {
    if (!isObject(target))
        return target;
    /**
     * target 创建的目标对象
     * isReadonly 当前对象是否是仅读
     * baseHandlers 针对不同方式创建代理对象
     */
    const proxyMap = isReadonly ? readonlyMap : reactiveMap;
    const existProxy = proxyMap.get(target);
    if (existProxy)
        return existProxy;
    const proxy = new Proxy(target, baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
}

function ref(value) {
    return createRef(value);
}
function shallowRef(value) {
    return createRef(value, true);
}
const convert = value => isObject(value) ? reactive(value) : value;
class RefImpl {
    constructor(rawValue, shallow) {
        this.rawValue = rawValue;
        this.shallow = shallow;
        this.__v_isRef = true;
        this._value = shallow ? rawValue : convert(rawValue);
        this.shallow = shallow;
    }
    get value() {
        track(this, 'get', 'value');
        return this._value;
    }
    set value(newValue) {
        if (hasChanged(newValue, this.rawValue)) {
            this.rawValue = newValue;
            this._value = this.shallow ? newValue : convert(newValue);
            trigger(this, 'set', 'value', newValue);
        }
    }
}
function createRef(value, shallow = false) {
    return new RefImpl(value, shallow);
}

exports.effect = effect;
exports.reactive = reactive;
exports.readonly = readonly;
exports.ref = ref;
exports.shallowReactive = shallowReactive;
exports.shallowReadonly = shallowReadonly;
exports.shallowRef = shallowRef;
//# sourceMappingURL=reactivity.cjs.js.map
