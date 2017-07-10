import { TableTrie } from '../custom_table/HeadProps'
// import PropTypes from 'prop-types'
import { store } from '../index.js'
import $ from 'jquery'
let gTrieId = 0;
const theadPaks = (state = [], action) => {
    switch (action.type) {
        case 'BUILD':
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
            console.log(action.id)
            const tId = '\uff04' + gTrieId++
            return [...state, {
                id: tId,
                trie: new TableTrie([tId], 0),
                // trie: testTrie[0], 
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
['placeHolder']
]
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
        console.log('th action',action)
            $.getJSON(action.url + action.tableName, (res) => {
                store.dispatch({
                    type: 'BUILD',
                    data: splitHead(res)
                })
                store.dispatch({
                    type: 'FETCH_RULE',
                    url: 'http://192.168.1.233:20080/tableRule/',
                    tableName: action.tableName
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
    let res = []
    return data.reference.map(ele => {
        return {
            fieldId: Object.keys(ele)[0],
            name: Object.values(ele)[0][0],
            radio: ruleTemp[0],
            input: ruleTemp[1],
            select: Object.values(ele)[0][1],
            shown: false
        }
    })
}
const popBox = (state = false, action) => {
    switch (action.type) {
        case 'POP_HEAD':
            return true;
        case 'CLOSE_POPBAR':
            return false;
        default:
            return state;

    }
}

const tableInfo = (state = '', action) => {
    switch (action.type) {
        case 'TABLE_NAME':
        console.log(action)
            return { tableName: action.tableName };
        default:
            return state;
    }
}
const category = (state = '', action) => {
    switch (action.type) {
        case 'INIT_TABLELIST':
            return state;
        default:
            return state;
    }
}
export const reducers = {
    theadPaks,
    dataAction,
    dataRule,
    popBox,
    tableInfo
}
export const splitHead = (data) => {
    let dp = Object.entries(data).map(ele => {
        return { [ele[0]]: ele[1].split('_') }
    })
    return dp
}
export const consTrie = (headPaks = []) => {
    let data = []
    let headPakId = 0
    headPaks.map(headPak => {
        const entry = Object.entries(headPak)[0]
        const key = entry[0]
        const value = entry[1]
        data.filter(dataPak => {
            return dataPak.data.value === value[0]
        }).length ? null :
            data.push({
                id: key,
                data: new TableTrie([key], 0, value[0])
            })
        data[data.length - 1].data.upsertPak(value, key)
    })
    return data
}
export const buildTrie = (headPaks = []) => {
    let data = []
    let headPakId = 0
    headPaks.map(headPak => {
        data.filter(dataPak => {
            return dataPak.value === headPak[0]
        }).length ? null :
            data.push(new TableTrie(['\uff04' + headPakId++], 0, headPak[0]))
        data[data.length - 1].upsertPak(headPak)
    })
    return data
}
