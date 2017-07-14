import { connect } from 'react-redux'
import { GlobalRuleComponents } from '../component/GlobalRuleComponents'

const mapStateToProps = state => {
    return {
        tableList: state.tableList,
        afterList: state.globalRule
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
        addAfterTable: (value= '') =>{
            dispatch({
                type: 'ADDAFTERTABLE',
                value: value
            })
        },
        delAfterTable: (value= '') =>{
            dispatch({
                type: 'DELAFTERTABLE',
                value : value
            })
        }
    }
}
export const GlobalRuleScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(GlobalRuleComponents)