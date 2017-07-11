import { connect } from 'react-redux'
import { RuleBox } from '../component/RuleComponents'
const mapStateToProps = state => {
    return {
        metaData: state.dataRule,
        rawData: state.rawData,
        tableList: state.tableList,
        name: state.tableInfo
    }
}
const mapDispatchToProps = dispatch => {
    return {
        saveRule: (data) => {
            dispatch({
                type: 'SAVE_RULE',
                data
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
        addRefField: (tableName, field,fieldId) => {
            dispatch({
                type: 'ADD_REFFIELD',
                tableName,
                field,
                fieldId
            })
        },
        /// warning
        initTableList:dispatch({
            type:'GET_TABLELIST'
        })
    }
}
export const RuleScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(RuleBox)