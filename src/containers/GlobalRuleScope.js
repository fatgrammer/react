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
        delAfterTable: (value='') =>{
            dispatch({
                type: 'DELAFTERTABLE'
            })
        }
    }
}
export const GlobalRuleScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(GlobalRuleComponents)