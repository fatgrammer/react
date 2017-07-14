import { TableTrie } from '../custom_table/HeadProps'
// import PropTypes from 'prop-types'
import { store } from '../index.js'
import { globalRule } from './GlobalRuleReducer.js'
import $ from 'jquery'

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

const ruleTemp = [{
    allowNull: false,
    isInteger: false,
    isDecimal: false,
    mainKey: false,
    lock: false
}, {
    dateFormat: ''
},
['placeHolder'],
[]
]

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
const dataAction = (state = [], action) => {
    switch (action.type) {
        case 'SAVE_RULE':
            console.log(compress(action.data))
            return state;
        case 'FETCH_RULE':
            $.getJSON(action.url + action.tableName, (res) => {
                store.dispatch({
                    type: 'IMPORT_RULE',
                    data: spread(res)
                })
            })
            return state
        case 'RESULT':
            $.post(action.url, action.data, function (response) {
                alert(response)
            }, 'json');
            return state
        case 'TABLE_HEADS':
            $.getJSON(action.url + action.tableName, (res) => {
                const fixHead = res['fixHead']
                fixHead ? delete res['fixHead'] : null;
                const pData = splitHead(res);
                console.log('length.....', pData)
                const type = res.type
                store.dispatch({
                    type: 'BUILD',
                    data: pData.slice(1)
                })
                store.dispatch({
                    type: 'TypeAndHead',
                    data: type,
                    fixHead,
                })
                store.dispatch({
                    type: 'FETCH_RULE',
                    url: 'http://192.168.1.249:20080/tableRule/',
                    tableName: action.tableName
                })
            })
            return state
        case 'GET_HEADS':
            const tableName = action.tableName || ''
            $.getJSON('http://192.168.1.249:20080/tableTemp/' + tableName, (data) => {
                console.log('rawHead', data)
                store.dispatch({
                    type: 'RAW_HEADS',
                    data
                })
            })
            return state

        case 'GET_TABLELIST':
            $.getJSON('http://192.168.1.249:20080/tableList', (data) => {
                store.dispatch({
                    type: 'TABLE_LIST',
                    data
                })
            })
            return state
        case 'TEST':
            alert()
            return state
        default:
            return state
    }
}
const rawData = (state = [], action) => {
    switch (action.type) {
        case 'RAW_HEADS':
            return action.data
        default:
            return state;
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
function compress(data = []) {
    return data.map(ele => {
        return ele.select[0] === 'placeHolder' ?
            {
                ...ele,
                select: ele.select.slice(1)
            }
            : ele
    }).filter(ele => {
        return ele.select.length
    }).map(ele => {
        return {
            [ele.fieldId]:
            ele.select
        }
    }).reduce((prev, next) => {
        return [...prev, next]
    }, [])

}
function spread(data = {}) {
    return data.reference.map(ele => {
        return {
            fieldId: Object.keys(ele)[0],
            name: Object.values(ele)[0][0],
            radio: ruleTemp[0],
            input: ruleTemp[1],
            select: Object.values(ele)[0][1],
            refBox: [],
            shown: false
        }
    })
}
const popBox = (state = false, action) => {
    switch (action.type) {
        case 'POP_HEAD':
            return true;
        case 'DELETE_PAK':
        case 'CLOSE_POPBAR':
            return false;
        default:
            return state;

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
const tableInfo = (state = { tableType: 'floating' }, action) => {
    switch (action.type) {
        case 'TypeAndHead':
            console.log('FixHead', action.fixHead)
            return {
                ...state,
                tableType: action.data || 'floating',
                fixHead: action.fixHead || []
            }
        case 'TABLE_NAME':
            return {
                ...state,
                tableName: action.tableName,
            };
        case 'TABLE_TYPE':
            console.log('tableType', action)
            return { ...state, tableType: action.tableType }
        case 'FIX_HEAD':
            return { ...state }
        default:
            return state;
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
    globalRule
}
export const splitHead = (data) => {
    let dp = Object.entries(data).map(ele => {
        return { [ele[0]]: ele[1].split('_') }
    })
    return dp
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

