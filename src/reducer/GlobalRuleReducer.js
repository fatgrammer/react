import { store } from '../index.js'

const tempGlobalRule = {
    afterTable: [],
    autoCal: []
}

export const globalRule = (state = tempGlobalRule.afterTable, action) => {
    switch (action.type) {
        case 'GETAFTERTABLE':
            return [...state];
        case 'ADDAFTERTABLE':
            if(!action.value)
                return state
            if(state.length == 0)
                return [...state, action.value]
            else
                return state.map(ele => ele != action.value).reduce((ele1, ele2) => ele1 && ele2) ? [...state, action.value] : state
        case 'DELAFTERTABLE':
            return state.filter(ele => ele !== action.value)
        default:
            return state
    }
}