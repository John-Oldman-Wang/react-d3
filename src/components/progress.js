const React = require("react")
const { Component } = require("react")


class Progress extends Component {
    render() {
        return (
            <div style={this.props.style} className='progress' >
                <div className='progress-bar' style={{
                    width: this.props.v * 100 + '%',
                    height: '100%',
                    
                }}></div>
            </div>
        )
    }
}

module.exports = Progress