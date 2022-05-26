import { hasChanged, isObject } from "@vue/shared"
import { reactive } from "."
import { track, trigger } from "./effect"

export function ref(value) {
    return createRef(value)
}

export function shallowRef(value) {
    return createRef(value, true)
}

const convert = value => isObject(value) ? reactive(value) : value
class RefImpl{
    public _value
    public __v_isRef = true
    constructor(public rawValue, public shallow) {
        this._value = shallow ? rawValue : convert(rawValue)
        this.shallow = shallow
    }

    get value() {
        track(this, 'get', 'value')
        return this._value
    }

    set value(newValue) {
        if(hasChanged(newValue, this.rawValue)){
            this.rawValue = newValue
            this._value = this.shallow ? newValue : convert(newValue)
            trigger(this, 'set', 'value', newValue)
        }
    }
}

function createRef(value, shallow = false){
    return new RefImpl(value, shallow)
}