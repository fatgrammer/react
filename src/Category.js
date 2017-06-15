import React, { Component } from 'react';
import {fetchJson} from './BackendApi'
import UL from './UL'
class Category extends Component{
    render(){
        return(
            <UL promise= {fetchJson("http://localhost:20080/tableList")}/>
        )
    }
}
export default Category