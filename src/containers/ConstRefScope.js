import { connect } from 'react-redux'
import { ConstRefBox } from '../component/ConstRefComponents'
const mapStateToProps = state => {
    return {
        tableName: state.tableInfo.tableName,
        fieldList: state.rawData.fieldList
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getHeads: (tableName) => {
            dispatch({
                type: 'GET_HEADS',
                tableName
            })
        }
    }
}
export const ConstRefScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConstRefBox)
