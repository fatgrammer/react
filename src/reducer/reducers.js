import { combineReducers } from 'redux'
import { TableTrie } from '../custom_table/HeadProps'
// import PropTypes from 'prop-types'
import $ from 'jquery'

const theadPak = (state = [], action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, {
                id: state.length,
                trie: new TableTrie(["th" + state.length], 0),
                shownProp: false,
                children: 0
            }];
        case 'INSERT':
            return [...state.slice(0, action.id),

            {
                ...state[action.id],
                trie: state[action.id].trie.sFindSert(
                    action.prefix,
                    action.head + 'th' + state[action.id].trie.sFindIdx(action.prefix)),
                children: state[action.id].children + 1
            },
            ...state.slice(action.id + 1)
            ]
        case 'POP_HEAD':
            return state.map(t => {
                if (t.id !== action.id) {
                    return {
                        ...t,
                        shownProp: false
                    }
                }
                return {
                    ...t,
                    shownProp: true
                }
            })
        case 'SAVE_HEAD':
            console.log('act ', action)

            return [...state.slice(0, action.id),
            {
                ...state[action.id],
                trie: state[action.id].trie.sFindSet(action.prefix, action.value)
            },
            ...state.slice(action.id + 1)
            ]
        //delete whole subtree
        case 'DELETE_BAR':
        console.log(action.prefix)
            return [...state.slice(0, action.id),
            {
                ...state[action.id],
                trie: state[action.id].trie.removeSubtree(action.prefix)
            },
            ...state.slice(action.id + 1)
            ]
        default:
            return state
    }
}

const ruleTemplate = {
    allowNull: false,
    isInteger: false,
    isDecimal: false,
    mainKey: false

}
const dataRule = (state = [], action) => {
    switch (action.type) {
        case 'POP_RULE':
            // state.filter(dataPak => dataPak.id === action.id) || state.push({

            //     id: action.id,
            //     rule: ruleTemplate
            // })
            return [...state, {
                id: action.id,
                rule: ruleTemplate
            }]

        default:
            return state
    }
}
const dataAction = (state = [], action) => {
    switch (action.type) {
        case 'RESULT':
            $.post(action.url, action.data, function (response) {
                alert(response)
            }, 'json');
            return state
        default:
            return state
    }
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

export const validation = (state = [], action) => {
    return state;
}
export const visibilityFilter = (state = [], action) => {
    switch (action.type) {
        case 'SHOW':
            return action.filter;
        default:
            return state;
    }
}

export const cellPairApp = combineReducers({
    theadPak,
    dataAction,
    dataRule,
    popBox
})
