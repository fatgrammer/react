import { connect } from 'react-redux'
import { GlobalRuleComponents } from '../component/GlobalRuleComponents'

const mapStateToProps = state => {
    return {
        tableName: state.tableInfo.tableName,
        tableList: state.tableList,
        afterList: state.globalRule,
        shown: state.GRuleShown,
        calcRuleSeq: state.autoCalc,
        fieldList: state.rawData.fieldList
    }
}
const mapDispatchToProps = dispatch => {
    return {
        initTableList: () => {
            dispatch({
                type: 'GET_TABLELIST'
            })
        },
        getAfterTable: () => {
            dispatch({
                type: 'GETAFTERTABLE'
            })
        },
        addAfterTable: (value = '') => {
            dispatch({
                type: 'ADDAFTERTABLE',
                value: value
            })
        },
        delAfterTable: (value = '') => {
            dispatch({
                type: 'DELAFTERTABLE',
                value: value
            })
        },
        closeGRuleBox: () => {
            dispatch({
                type: 'CLOSE_GRULEBOX'
            })
        },
        addRuleElement: (eleType) => {
            dispatch({
                type: 'ADD_CALCELE',
                eleType
            })
        },
        getRawHeads: (tableName) => {
            dispatch({
                type: 'GET_HEADS',
                tableName
            })
        },
        delCalcEle: (id) => {
            dispatch({
                type: 'DEL_CALCELE',
                id
            })
        },
        altCalcEle: (eleVal, id) => {
            dispatch({
                type: 'ALT_CALCELE',
                eleVal,
                id
            })
        },
        saveCalcEle: (tableName) => {
            dispatch({
                type: 'SAVE_CALCELE',
                tableName
            })
        },
        initCalcEle: (initData) => {
            dispatch({
                type: 'INIT_CALCELE',
                initData
            })
        }
    }
}
export const GlobalRuleScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(GlobalRuleComponents)