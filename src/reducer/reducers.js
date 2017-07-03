import { combineReducers } from 'redux'
import { TableTrie } from '../custom_table/HeadProps'
// import PropTypes from 'prop-types'
import $ from 'jquery'
let gTrieId = 0;
const theadPaks = (state = [], action) => {
    switch (action.type) {
        case 'ADD':
            const tId = "th" + gTrieId++
            return [...state, {
                id: tId,
                trie: new TableTrie([tId], 0),
                shownProp: false,
                children: 0
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
                    action.head + 'th' + state.trie.sFindIdx(action.prefix)),
                children: state.children + 1
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
    theadPaks,
    dataAction,
    dataRule,
    popBox
})
