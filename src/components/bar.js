const React = require("react")
const { Component } = require("react")
const ReactDom = require("react-dom")
class Bar extends Component {
    constructor(props) {
        super(props)
        var config = {
            width: 1100,
            height: 600,
            top: 50,
            left: 50,
            data: [
                { "number": 4, "name": "Locke" },
                { "number": 8, "name": "Reyes" },
                { "number": 15, "name": "Ford" },
                { "number": 16, "name": "Jarrah" },
                { "number": 23, "name": "Shephard" },
                { "number": 42, "name": "Kwon" }
            ]
        }
        this.state = Object.assign(config, this.props)
        window.bar = this
    }
    componentWillReceiveProps(nextprops) {
        this.setState(Object.assign({}, this.state, nextprops))
        //console.log("componentWillReceiveProps")
    }
    shouldComponentUpdate(nextprops, nextstate) {
        // console.log("arc shouldComponentUpdate")
        return true
    }
    componentWillUpdate() {
        // console.log("componentWillUpdate")
    }
    componentDidUpdate() {
        // console.log("componentDidUpdate")
    }
    componentWillMount() {
        //console.log("componentWillMount")
    }
    componentDidMount() {
        //console.log("componentDidMount")
    }
    render() {
        var scale = d3.scaleLinear().domain([0, d3.max(this.state.data, function (d) {
            return d.number;
        })]).range([0, this.state.height - 2 * this.state.top]);
        var barWidth = (this.state.width - 2 * this.state.left) / this.state.data.length
        var h = this.state.height - 2 * this.state.top
        return (<div><svg style={{
            width: this.state.width,
            height: this.state.height,
            userSelect: "none"
        }}>
            <g ref="g" style={{ overflow: 'hidden', height: this.state.height - 2 * this.state.top + 'px', "transform": 'translate(' + this.state.left + 'px, ' + this.state.top + 'px)' }}>
                {this.state.data.map((item, index) => {
                    // <g key={index}>
                    return <rect
                        key={index}
                        x={barWidth * index}
                        y={h - scale(item.number)}
                        rx={2}
                        ry={2}
                        width={barWidth - 2}
                        height={scale(item.number)}
                        fill="#222"
                        strokeWidth="1px"
                        stroke="#222"></rect>
                        {/* <text
                            x={barWidth * index + barWidth / 2 + 1}
                            y={h - scale(item.number)}
                            style={{
                                fontSize: '20px',
                                transform:'translate(-'+item.name.length*5+'px,0)',
                                transition: 'y 3s ease'
                            }}
                        
                        >{`${item.name}`}</text>
                        <text
                            x={barWidth * index + barWidth / 2 + 1}
                            y={h - scale(item.number)+20}
                            style={{
                                fontSize: '20px',
                                fill: '#fff',
                                transform: 'translate(-' + (item.number+"").length * 5 + 'px,0)'
                            }}

                        >{`${item.number}`}</text> */}
                        // </g>
                })}
            </g>
        </svg>
            <ul>
                {this.state.data.map((item, index) => {
                    return <li key={index}>{"name: " + item.name + ", number: " + item.number}</li>
                })}
            </ul>
        </div>)
    }
}
module.exports = Bar
