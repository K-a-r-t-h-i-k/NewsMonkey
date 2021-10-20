import React, { Component } from 'react'
import spinner from '../giphy.gif'

export class Spinner extends Component {
    myStyle={
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "35%"
    }
    render() {
        return (
            <div>
                <img src={spinner} alt="Loading" style={this.myStyle}/>
            </div>
        )
    }
}

export default Spinner
