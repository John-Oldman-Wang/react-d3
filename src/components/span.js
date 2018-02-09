const React = require("react")
const { Component } = require("react")


class Span extends Component {
    render() {
        var str = this.props.str+''
        var arr=str.split('')
        var style = Object.assign({
            display: 'inline-block',
            padding: '2px 4px',
            fontSize: '20px',
            margin: '0px 5px',
            background: '#00fffe',
            color: '#000',
            borderRadius: '4px',
        },this.props.style)
        console.log(arr)
        return (<React.Fragment>
            {arr.map( (item, index)=><span
                    key={index}
                    style={style}
                >{item}</span>)
                }
        </React.Fragment>
        )
    }
}

module.exports = Span