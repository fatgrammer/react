import { connect } from 'react-redux'
import { RuleBox } from '../component/RuleComponents'
const mapStateToProps = state => {
    return {
        metaData: state.dataRule,
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
                type: 'GET_FIELD',
                tableName
            })
        }

    }
}
export const RuleScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(RuleBox)