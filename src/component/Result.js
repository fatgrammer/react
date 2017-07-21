import React from 'react'
import { Button } from './Widget'
export class Result extends React.Component {
    render() {
        const hb = this.props.headBlock
        const props = this.props
        let list = {};
        list = {
            ...this.props.head,
            ...list
        }
        list = {
            ...list,
            ...hb.map(headPak => {
                return headPak.data.map(heads => {
                    return {
                        [heads[heads.length - 1].head]:
                        heads.map(head => head.value).reduce((prev, next) => {
                            return prev + '_' + next
                        })
                    }
                })
            }).reduce((prev, next) => {
                return [...prev, ...next]
            }, []).reduce((prev, next) => {
                return { ...prev, ...next }
            }, {})
        }
        list['tableType'] === 'fixing' || delete list['fixHead']
        return <div>
            <hr />
            <Button id='result' primary value='完成' onClick={
                () => props.onResultClick('http://192.168.1.249:20080/customTable',
                    { data: JSON.stringify(list) })
            } />
            <br />
            <br />
            <br />
            <hr />
            {JSON.stringify(list)}
            <br />
            <Button primary id='test' value='test???' onClick={
                () => props.TEST(
                    'http://192.168.1.249:20080/tableTemp/',
                    this.props.head.tableName)
            }
            />
        </div>

    }
    componentDidMount() {
        this.props.TEST(
            'http://192.168.1.249:20080/tableTemp/',
            this.props.head.tableName || '')
    }
}