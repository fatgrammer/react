import React from 'react'
import { PreviewScope } from '../containers/PreviewScope'
import { EditScope } from '../containers/EditScope'
import { ResultScope } from '../containers/ResultScope'
import { RuleScope } from '../containers/RuleScope'
import { GlobalRuleScope } from '../containers/GlobalRuleScope'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Link } from 'react-router-dom'
export const App = () => {
    return <MuiThemeProvider>
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

            <PreviewScope />
            <EditScope />
            <ResultScope />
            <RuleScope />
            <GlobalRuleScope />
        </div>
    </MuiThemeProvider>
}