import { connect } from 'react-redux'
import { RuleBox } from '../component/RuleComponents'
const mapStateToProps = state => {
    return {
        metaData: state.dataRule,
        fieldList: state.rawData.fieldList,
        hide: state.floatBox,
        tableList: state.tableList,
        name: state.tableInfo,
        shown: state.ruleBox,
        refBoxShown: state.refBox
    }
}
const mapDispatchToProps = dispatch => {
    return {
        saveRule: (data,tableName) => {
            dispatch({
                type: 'SAVE_RULE',
                data,
                tableName
            })
        },
        closeRuleBox: () => {
            dispatch({
                type: 'CLOSE_RULEBOX'
            })
        },
        addOption: (fieldId, value) => {
            dispatch({
                type: 'ADD_OPTION',
                fieldId,
                value
            })
        },
        onRefBoxChange: (tableName) => {
            dispatch({
                type: 'GET_HEADS',
                tableName
            })
        },
        onOpenOptions: () => {
            dispatch({
                type: 'OPEN',
                id: 'OPTIONS'
            })
        },
        onCloseOptions: () => {
            dispatch({
                type: 'CLOSE',
                id: 'OPTIONS'
            })
        },
        addRefField: (tableName, field, fieldId) => {
            dispatch({
                type: 'ADD_REFFIELD',
                tableName,
                field,
                fieldId
            })
        },
        showRefBox: () => {
            dispatch({
                type: 'SHOW_REFBOX'
            })
        },
        closeRefBox: () => {
            dispatch({
                type: 'CLOSE_REFBOX'
            })
        },
        /// warning
        initTableList: dispatch({
            type: 'GET_TABLELIST'
        })
    }
}
export const RuleScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(RuleBox)