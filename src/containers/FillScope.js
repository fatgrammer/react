import { connect } from 'react-redux'
import { FillTable } from '../component/FillTable'
const mapStateToProps = state => {
    return {
        tableName: state.tableInfo.tableName,
        tableType: state.tableInfo.tableType,
        floatingData: state.fillData.floatingData,
        tableRule: state.dataRule,
        globalRule: state.autoCalc,
        rawData: state.rawData,
        calcData: state.calcData.expression,
        calcTotal:state.calcData.total
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addLine: (data) => dispatch({
            type: 'ADD_FloatingData',
            data
        }),
        fetchRule: (url, tableName) => dispatch({
            type: 'FETCH_RULE',
            url,
            tableName
        }),
        getHeads: (tableName) => dispatch({
            type: 'GET_HEADS',
            tableName
        }),
        saveCalcData: (data) => dispatch({
            type: 'SAVE_CALCMAP',
            data
        }),
        initCalcEle: (initData) => {
            dispatch({
                type: 'INIT_CALCELE',
                initData
            })
        }
    }
}
export const FillScope = connect(
    mapStateToProps,
    mapDispatchToProps
)(FillTable)


