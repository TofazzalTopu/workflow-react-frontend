import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const firstColStyle = { align: 'center' };
        return (
            <div style={firstColStyle}>
                <footer className = "footer">
                    <span className="text-muted">All Rights Reserved 2020 @Tofazzal</span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent
