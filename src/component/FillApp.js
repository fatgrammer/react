
import React from 'react'
import { Link } from 'react-router-dom'
import { TableCategory } from '../containers/TableCategory'
import { SimpleRen, TheadRen } from './TableRen'
import $ from 'jquery'
const fixjson = '[[{"headField":"1.学校名称","colSpan":2,"rowSpan":1}],[{"headField":"2.代码","colSpan":2,"rowSpan":1}],[{"headField":"3.英文名称","colSpan":2,"rowSpan":1}],[{"headField":"4.办学类型","colSpan":2,"rowSpan":1}],[{"headField":"5.学校性质","colSpan":2,"rowSpan":1}],[{"headField":"6.举办者","colSpan":2,"rowSpan":1}],[{"headField":"7.主管部门","colSpan":2,"rowSpan":1}],[{"headField":"8.学校网址","colSpan":2,"rowSpan":1}],[{"headField":"9.招生批次","colSpan":2,"rowSpan":1}],[{"headField":"10.开办本科教育年份","colSpan":2,"rowSpan":1}],[{"headField":"11.填报负责人","colSpan":1,"rowSpan":3},{"headField":"姓名","colSpan":1,"rowSpan":1}],[{"headField":"联系电话","colSpan":1,"rowSpan":1}],[{"headField":"联系电子邮箱","colSpan":1,"rowSpan":1}]]'
const floatjson = '[[{"headField":"1.学校名称","colSpan":1,"rowSpan":2},{"headField":"2.代码","colSpan":1,"rowSpan":2},{"headField":"3.英文名称","colSpan":1,"rowSpan":2},{"headField":"4.办学类型","colSpan":1,"rowSpan":2},{"headField":"5.学校性质","colSpan":1,"rowSpan":2},{"headField":"6.举办者","colSpan":1,"rowSpan":2},{"headField":"7.主管部门","colSpan":1,"rowSpan":2},{"headField":"8.学校网址","colSpan":1,"rowSpan":2},{"headField":"9.招生批次","colSpan":1,"rowSpan":2},{"headField":"10.开办本科教育年份","colSpan":1,"rowSpan":2},{"headField":"11.填报负责人","colSpan":3,"rowSpan":0}],[{"headField":"姓名","colSpan":1,"rowSpan":1},{"headField":"联系电话","colSpan":1,"rowSpan":1},{"headField":"联系电子邮箱","colSpan":1,"rowSpan":1}]]'
const data = JSON.parse(fixjson)
export const FillApp = () => (
    <div>
        <Link to='/'
            style={{
                marginLeft: '40%',
                borderRadius: '3px',
                fontSize: '2em',
                padding: '8px',
                backgroundColor: 'wheat',
                height: '30px',
                width: '100px'
            }}>return Homepage</Link>
        <h1>FillDataHere</h1>
        <table>
            <FillScope />
        </table>
    </div>
)


class FillScope extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headsList: []
        }
    }
    componentDidMount() {
        $.getJSON('http://192.168.1.249:20080/fixingHead/1-1', (ret) => {
            this.setState({
                headsList: ret
            })
        })
    }
    render() {
        return <SimpleRen headsList={this.state.headsList} />
    }
}