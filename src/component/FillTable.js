
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
    componentDidMount() {
        $.getJSON('http://192.168.1.249:20080/adaptiveHead/' + this.props.tableName, (ret) => {
            console.log('ret', ret)
            this.setState({
                headsData: ret
            })
        })
    }
    render() {

        if (this.state.headsData === '') return null

        const refer = this.state.headsData.headsList[0].length
        let trid = 0;
        console.log('propss', this.props.fillData)
        return <table>
            <caption>
                {this.state.headsData.tableType === 'fixing' ||
                    <Button value="ADD" secondary
                        onClick={() => this.props.addLine(Array(refer).fill().map(e => 'hex'))}
                    />

                }</caption>

            <SimpleRen headsData={this.state.headsData} />

            <tbody>
                {this.props.fillData.map(ele => {
                    let lid = 0;
                    return <tr key={trid++}>
                        {ele.map(
                            t => {
                                return <td key={lid++}><TextField style={{maxWidth:'12em'}}/></td>
                            }
                        )}
                    </tr>
                })}
            </tbody>
        </table>
    }
}