import React from 'react'
import $ from 'jquery'

import {URL} from './homepage.js'

export class FlashDummy extends React.Component {
  componentWillMount(){
    $.getJSON(URL + 'fullList', null, (data)=>{
      this.setState({
        data:data
      })
      this.props.fetchData(data)
    })
  }
  render(){
    return null
  }
}
