import { TableTrie } from '../custom_table/HeadProps'
// import PropTypes from 'prop-types'
import { globalRule } from './GlobalRuleReducer.js'
import { tableInfo, rawData } from './DataAndInfo'
import { dataAction, ruleTemp } from './DataEvents'
import { constRef } from './ConstantReducer'
import { fillData } from './FillData'
let gTrieId = 0;
const theadPaks = (state = [], action) => {
    switch (action.type) {
        case 'BUILD':
            console.log('shit', action)
            const pData = consTrie(action.data)
            gTrieId = pData.length
            return pData.map(ele => {
                return {
                    id: ele.id,
                    trie: ele.data,
                    shownProp: false
                }
            })
        case 'ADD':
            const tId = '\uff04' + gTrieId++
            return [...state, {
                id: tId,
                trie: new TableTrie([tId], 0),
                shownProp: false
            }];
        case 'DELETE_PAK':
            return state.filter(t => {
                return theadPak(t, action)
            })
        case 'INSERT':
            return state.map(t => {
                return theadPak(t, action)
            })
        case 'POP_HEAD':
            console.log('phead ', action)
            return state.map(t => {
                return theadPak(t, action)
            })
        case 'SAVE_HEAD':
            return state.map(t => {
                return theadPak(t, action)
            })
        //delete whole subtree
        case 'DELETE_BAR':
            return state.map(t => {
                return theadPak(t, action)
            })
        default:
            return state
    }
}
const theadPak = (state, action) => {
    switch (action.type) {
        case 'DELETE_PAK':
            return state.id !== action.id
        case 'INSERT':
            if (state.id !== action.id) {
                return state
            }
            return {
                ...state,
                trie: state.trie.sFindSert(
                    action.prefix,
                    action.head + '\uff04' + state.trie.sFindIdx(action.prefix)),
            }
        case 'POP_HEAD':
            if (state.id !== action.id) {
                return {
                    ...state,
                    shownProp: false
                }
            }
            return {
                ...state,
                shownProp: true
            }
        case 'SAVE_HEAD':
            if (state.id !== action.id) {
                return state
            }
            return {
                ...state,
                trie: state.trie.sFindSet(action.prefix, action.value)
            }
        //delete whole subtree
        case 'DELETE_BAR':

            if (state.id !== action.id) {
                return state
            }
            return {
                ...state,
                trie: state.trie.removeSubtree(action.prefix)
            }
        default:
            return state
    }
}



// Warn if overriding existing method
if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length !== array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] !== array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });
const dataRule = (state = [], action) => {
    switch (action.type) {
        case 'ADD_OPTION':
            return state.map(t => {
                if (t.fieldId !== action.fieldId) {
                    return t
                }
                return {
                    ...t,
                    select: [...t.select, action.value]
                }
            })
        case 'ADD_REFFIELD':
            const lid = action.fieldId;
            const fields = action.field.split(',')
            return state.map(t => {
                if (t.fieldId !== lid) {
                    console.log('==', t.fieldId, 'd', lid)
                    return t
                }
                if (t.refBox.filter(ele => {
                    console.log('ele', ele, 'com', [action.tableName, ...fields])
                    const eq = ele.equals([action.tableName, ...fields])
                    console.log(eq)
                    return eq;
                }).length) {
                    return t;
                } else {
                    return {
                        ...t,
                        refBox: [...t.refBox, [action.tableName, ...fields]]
                    }
                }
            })
        case 'POP_RULE':
            const ts = state.filter(t => {
                return t.fieldId === action.fieldId
            }).length ? state : [...state,
            // Object.assign({}, ruleTemp)
            {
                fieldId: action.fieldId,
                name: action.name,
                radio: ruleTemp[0],
                input: ruleTemp[1],
                select: ruleTemp[2],
                refBox: ruleTemp[3],
                shown: true
            }
                ]
            return ts.map(t => {
                if (t.fieldId !== action.fieldId) {
                    return { ...t, shown: false }
                }
                return {
                    ...t,
                    name: action.name,
                    shown: true
                }
            })
        case 'IMPORT_RULE':
            return action.data.length ? action.data : []
        default:
            return state
    }
}

const tableList = (state = [], action) => {
    switch (action.type) {
        case 'TABLE_LIST':
            return action.data
        default:
            return state
    }
}


const popBox = (state = false, action) => {
    switch (action.type) {
        case 'POP_HEAD':
            return true;
        case 'DELETE_PAK':
        case 'SHOW_RULEBOX':
        case 'SHOW_GRULEBOX':
        case 'CLOSE_POPBAR':
            return false;
        default:
            return state;

    }
}
const ruleBox = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_RULEBOX':
            console.log('shiowwwww')
            return true;
        case 'POP_HEAD':
        case 'SHOW_GRULEBOX':
        case 'CLOSE_RULEBOX':
            return false;
        default:
            return state
    }
}
const GRuleShown = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_GRULEBOX':
            return true
        case 'CLOSE_GRULEBOX':
        case 'SHOW_RULEBOX':
        case 'POP_HEAD':
            return false;
        default:
            return state
    }
}
const floatBox = (state = '', action) => {
    switch (action.type) {
        case 'OPEN':
            return true
        case 'CLOSE':
            return false
        default:
            return state
    }
}
const refBox = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_REFBOX':
            return true;
        case 'CLOSE_REFBOX':
            return false;
        default:
            return state
    }
}

// const category = (state = '', action) => {
//     switch (action.type) {
//         case 'INIT_TABLELIST':
//             return state;
//         default:
//             return state;
//     }
// }

export const reducers = {
    theadPaks,
    dataAction,
    dataRule,
    popBox,
    tableInfo,
    floatBox,
    rawData,
    tableList,
    globalRule,
    ruleBox,
    GRuleShown,
    refBox,
    constRef,
    fillData


}

export const consTrie = (headPaks = []) => {
    let data = []
    console.log('headPak', headPaks)

    headPaks.forEach(headPak => {
        const entry = Object.entries(headPak)[0]
        const key = entry[0]
        const value = entry[1];
        data.filter(dataPak =>
            dataPak.data.value === value[0]
        ).length ? null :
            data.push({
                id: key,
                data: new TableTrie([key], 0, value[0])
            })
        data[data.length - 1].data.upsertPak(value, key)
    })
    return data
}

