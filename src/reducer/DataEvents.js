import $ from 'jquery'

import { store } from '../index.js'


export const dataAction = (state = [], action) => {
    switch (action.type) {
        case 'SAVE_RULE':
            const cData = { data: JSON.stringify(compress(action.data)) }
            console.log(cData)
            $.post('http://192.168.1.249:20080/tableRule', cData, (res) => {
                alert("Save Successfully")
            })
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
            console.log(action.data.tableName.trim())
            if (!action.data.tableName.trim()) {
                alert('Input tableName please')
                return state
            }
            const resultData = { data: JSON.stringify(action.data) }
            $.post(action.url, resultData, function (response) {
            }, 'json');
            return state
        case 'TABLE_HEADS':
            $.getJSON(action.url + action.tableName, (res) => {
                const fixHead = res['fixHead']
                !fixHead || delete res['fixHead']
                const pData = splitHead(res);
                const type = res['tableType']
                console.log('length.....', res)
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
            console.log('???');
            $.getJSON('http://192.168.1.249:20080/tableTemp/' + action.tableName, (data) => {
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
        case 'GET_CREFDATA':
            $.getJSON('http://192.168.1.249:20080/constRef/' + action.tableName, (data) => {
                store.dispatch({
                    type: 'CONSTREF_DATA',
                    data
                })
            })
        case 'TEST':
            return state
        default:
            return state
    }
}


export const ruleTemp = [{
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

export const splitHead = (data) => {
    let dp = Object.entries(data).map(ele => {
        return { [ele[0]]: ele[1].split('_') }
    })
    return dp
}