import { connect } from 'react-redux'
import { ConstRefBox } from '../component/ConstRefComponents'
const mapStateToProps = state => {
    return {
        tableName: state.tableInfo.tableName,
        fieldList: state.rawData.fieldList,
        cRefData: state.constRef.data,
        tableType: state.tableInfo.tableType
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
        getCRefData: (tableName) => dispatch({
            type: 'GET_CREFDATA',
            tableName
        }),
        handleType: (tableType) => {
            dispatch({
                type: 'TABLE_TYPE',
                tableType
            })
        }

    }
}
export const ConstRefScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConstRefBox)
