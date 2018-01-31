const React = require("react")
const { Component } = require("react")
const ReactDom = require("react-dom")

const d3 = require("d3")
var color = d3.schemeCategory20;
color = color.concat(d3.schemeCategory20b);
color = color.concat(d3.schemeCategory20c);
var projection, path;

var config = {
    width: 1200,
    height: 1000
}
class ChinaMap extends Component {
    constructor(props) {
        super(props)
        var root = require('../../json/china.js')
        // console.log(Object.keys (root) )
        projection = d3.geoMercator()
            .center([107, 31])
            .scale(Math.min(config.width, config.height))
            .translate([config.width / 2 + 30, config.height / 2 + 0.15 * config.height]);
        path = d3.geoPath().projection(projection);
        this.state = {
            features: root.features,
            focus: ""
        }
        window.m = this
    }
    componentWillReceiveProps() {
        //console.log("componentWillReceiveProps", arguments)
    }
    shouldComponentUpdate(nextprops, nextstate) {
        //console.log("arc shouldComponentUpdate")
        return true
    }
    componentWillUpdate() {
        // console.log("componentWillUpdate", arguments)
    }
    componentDidUpdate() {
        // console.log("componentDidUpdate", arguments)
    }
    componentWillMount() {
        // console.log("componentWillMount", arguments)
    }
    componentDidMount() {
        // console.log("componentDidMount", arguments)
    }
    render() {
        if (this.state.focus == '') {
            return (
                <div>
                    <svg ref="svg" className='map' style={{
                        width: config.width,
                        height: config.height,
                        userSelect: 'none',
                        transition: 'none',
                        border: '1px solid red'
                    }}>
                        <g>
                            {this.state.features.map((item, index) => {
                                return (

                                    <path
                                        key={index}
                                        fill={color[index]}
                                        d={path(item)}
                                        stroke='#222'
                                        strokeWidth='1'
                                        onMouseOver={(e) => {
                                            var self = e.target
                                            self.setAttribute('fill', 'yellow')
                                        }}
                                        onMouseOut={(e) => {
                                            var self = e.target
                                            self.setAttribute('fill', color[index])
                                        }}
                                        onClick={(e) => {
                                            this.setState({
                                                focus: item
                                            })
                                        }}
                                    ></path>
                                )
                            })}
                        </g>
                        <g>
                            {this.state.features.map((item, index) => {
                                var xy = path.centroid(item)
                                return (
                                    <text
                                        onClick={(e) => {
                                            this.setState({
                                                focus: item
                                            })
                                        }}
                                        key={index}
                                        x={xy[0]}
                                        y={xy[1]}
                                        fill="#000"
                                    >{item.properties.name}
                                    </text>)
                            })}
                        </g>
                    </svg>
                </div>
            )
        } else {
            var $projection = d3.geoMercator().center(this.state.focus.properties.cp).scale(this.state.focus.properties.size * 3).translate([config.width / 2, config.height / 2])
            var $path = d3.geoPath().projection($projection)
            var axis = $path.centroid(this.state.focus)
            return (
                <div>
                    <svg ref="svg" className='map' style={{
                        width: config.width,
                        height: config.height,
                        userSelect: 'none',
                        transition: 'none',
                        border: '1px solid red'
                    }}>
                        <g onClick={() => {
                            this.setState({
                                focus: ''
                            })
                        }}>
                            <path
                                stroke='#222'
                                strokeWidth='1'
                                fill={color[this.state.focus.properties.childNum]}
                                d={$path(this.state.focus)}
                            />
                            <text
                                x={axis[0]}
                                y={axis[1]}
                                fill="#000"
                            >{this.state.focus.properties.name}
                            </text>
                        </g>
                    </svg>
                </div>
            )
        }
    }
}
module.exports = ChinaMap
