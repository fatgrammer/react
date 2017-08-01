
import React from 'react'
import { SimpleRen } from './TableRen'
import { Button } from './Widget'
import $ from 'jquery'
import TextField from 'material-ui/TextField';
export class FillTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headsData: '',
        }
    }
    componentWillMount() {
        this.props.getHeads(this.props.tableName);
        $.getJSON('http://192.168.1.249:20080/globalRule/' + this.props.tableName, (data) => {
            this.props.initCalcEle(data.expression)
        })
    }
    componentDidMount() {
        $.getJSON('http://192.168.1.249:20080/adaptiveHead/' + this.props.tableName, (ret) => {
            this.setState({
                headsData: ret
            })
        })
        this.props.fetchRule('http://192.168.1.249:20080/tableRule/', this.props.tableName)
    }
    render() {
        if (this.state.headsData === '') return null
        const refer = this.state.headsData.headsList[0].length
        return <table>
            <caption>{this.state.headsData.tableType === 'fixing' ||
                <Button value="ADD" secondary
                    onClick={() => this.props.addLine(Array(refer).fill().map(e => 'hex'))}
                />
            }</caption>
            <SimpleRen
                headsData={this.state.headsData}
                tableRule={this.props.tableRule}
                globalRule={this.props.globalRule}
                rawData={this.props.rawData}
                saveCalcData={this.props.saveCalcData}
                calcData={this.props.calcData}
                calcTotal={this.props.calcTotal}
            />
            {this.state.headsData.tableType === 'fixing' ? null :
                <tbody>
                    {this.props.floatingData.map((ele, trid) =>
                        <tr key={trid}>
                            {ele.map(
                                (t, lid) => <td key={lid}><TextField style={{ maxWidth: '12em' }} /></td>
                            )}
                        </tr>
                    )}
                </tbody>}
        </table>
    }
}