import { store } from '../index.js'
import $ from 'jquery'
const tempGlobalRule = {
    afterTable: [],
    autoCal: []
}

export const globalRule = (state = tempGlobalRule.afterTable, action) => {
    switch (action.type) {
        case 'GETAFTERTABLE':
            return [...state];
        case 'ADDAFTERTABLE':
            if (!action.value)
                return state
            if (state.length === 0)
                return [...state, action.value]
            else
                return state.map(ele => ele !== action.value).reduce((ele1, ele2) => ele1 && ele2) ? [...state, action.value] : state
        case 'DELAFTERTABLE':
            return state.filter(ele => ele !== action.value)
        default:
            return state
    }
}
let fdid = 0;
export const autoCalc = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CALCELE':
            return [...state, {
                id: fdid++,
                eleType: action.eleType
            }]
        case 'DEL_CALCELE':
            return state.filter((ele, idx) => action.id !== ele.id)
        case 'ALT_CALCELE':
            console.log('t.id', state, "  ", action.id)
            return state.map(t => {
                if (t.id !== action.id) {
                    return t
                }
                console.log('alt', action.eleVal);
                return {
                    ...t,
                    element: action.eleVal
                }
            })
        case 'SAVE_CALCELE':
            const cData = compress(state)
            console.log('cData', cData)
            if (!validate(cData)) {
                return state;
            }
            const Jdata = {
                tableName: action.tableName,
                expression: cData
            }
            $.post("http://192.168.1.249:20080/globalRule/" + action.tableName, { "data": JSON.stringify(Jdata) }, (data) => {
                console.log('suc')
            })
            return state
        case 'INIT_CALCELE':
        console.log(action.initData)
            return action.initData;
        default:
            return state
    }
}
const isRelOp = (op) => {
    switch (op) {
        case '=':
        case '>=':
        case '<=':
        case '!=':
            return true
        default:
            return false
    }
}
const validate = (data = []) => {
    if (data.filter(ele => {
        return isRelOp(ele.element)
    }).length === 0) {
        alert('need a relation operator')
        return false
    }
    return true

}
const compress = (state = []) => {
    let cData = []
    state.forEach(ele => {
        cData.push(ele)
    })
    return cData
}
