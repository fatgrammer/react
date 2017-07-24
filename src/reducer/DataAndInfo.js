export const tableInfo = (state = { tableType: 'floating', fixHeadShown: true }, action) => {
    switch (action.type) {
        case 'TypeAndHead':
            console.log('FixHead', action.fixHead)
            return {
                ...state,
                tableType: action.data || 'floating',
                fixHead: action.fixHead || []
            }
        case 'TABLE_NAME':
            return {
                ...state,
                tableName: action.tableName,
            };
        case 'TABLE_TYPE':
            return { ...state, tableType: action.tableType }
        case 'ALT_FIXHEAD':
            const fixHead = state.fixHead || ['']
            const tmp = [...fixHead.slice(0, action.id),
            action.text,
            ...fixHead.slice(action.id + 1)]
            return {
                ...state,
                fixHead: tmp
            }
        case 'SHOW_FIXHEAD':
            return {
                ...state,
                fixHeadShown: !state.fixHeadShown
            }

        default:
            return state;
    }
}
export const rawData = (state = {}, action) => {
    switch (action.type) {
        case 'RAW_HEADS':
            const fieldList = action.data
            delete fieldList['fixHead']
            delete fieldList['tableType']
            console.log('rawdata', fieldList)
            return {
                ...state,
                fieldList: fieldList || {}
            }
        default:
            return state;
    }
}