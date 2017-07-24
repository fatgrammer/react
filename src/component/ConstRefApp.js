import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ConstRefScope } from '../containers/ConstRefScope'
export const ConstRefApp = () => (
    < MuiThemeProvider >
        <div >
            <h1>Constant Reference</h1>
            <ConstRefScope />
        </div >
    </MuiThemeProvider >
)
