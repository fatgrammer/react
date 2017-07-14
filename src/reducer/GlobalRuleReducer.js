import { store } from '../index.js'

const tempGlobalRule = {
    afterTable: ["表1", "表2", "表3"],
    autoCal: []
}

export const globalRule = (state = [], action) => {
    switch (action.type) {
        case 'GETAFTERTABLE':
            console.log(tempGlobalRule.afterTable)
            return tempGlobalRule.afterTable;
        case 'ADDAFTERTABLE':
            // tempGlobalRule.afterTable.push(action.data)
            return [...state, action.value]
        case 'DELAFTERTABLE':
            return state.afterTable.filter(ele => ele !== action.value)
        default:
            return state
    }
}