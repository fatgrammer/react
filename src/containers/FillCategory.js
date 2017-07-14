import { connect } from 'react-redux'
import { FillList } from '../component/FillList'
const mapStateToProps = state => {
    return {
        TableList: state.dataAction
    }
}
const mapDispatchToProps = dispatch => {
    return {
        tableName: (tableName) => {
            dispatch({
                type: 'TABLE_NAME',
                tableName
            })
        }
    }
}
export const FillCategory = connect(
    mapStateToProps,
    mapDispatchToProps
)(FillList)
