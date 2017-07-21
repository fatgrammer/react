import { connect } from 'react-redux'
import { ConstRefBox } from '../component/ConstRefComponents'
const mapStateToProps = state => {
    return {
        tableName: state.tableInfo.tableName,
        fieldList: state.rawData.fieldList,
        cRefData: state.constRef.data
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getHeads: (tableName) => {
            dispatch({
                type: 'GET_HEADS',
                tableName
            })
        },
        getCRefData: dispatch({ type: 'GET_CREFDATA' })

    }
}
export const ConstRefScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConstRefBox)
