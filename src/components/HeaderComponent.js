import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
     const firstColStyle = { align: 'center' };
        return (
            <div style={firstColStyle}>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark navbar-right">
                        <div><a href="" className="navbar-brand">Workflow Management App</a></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
