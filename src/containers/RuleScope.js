import { connect } from 'react-redux'
import { RuleBox } from '../component/RuleComponents'
const mapStateToProps = state => {
    return {
        metaData: state.dataRule,
        rawData: state.rawData,
        name: state.tableInfo,
        hide: state.floatBox
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
    }
}
export const RuleScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(RuleBox)