const React = require("react")
const { Component } = require("react")
const ReactDom = require("react-dom")
class Line extends Component {
    constructor(props) {
        super(props)
        //data x y width:600 height:300 top:50 left:50
        var config={
            width: 1100,
            height: 600,
            top: 50,
            left: 50,
            data: [
                { x: 0, y: 11 }, { x: 1, y: 35 },
                { x: 2, y: 23 }, { x: 3, y: 78 },
                { x: 4, y: 55 }, { x: 5, y: 18 },
                { x: 6, y: 98 }, { x: 7, y: 100 },
                { x: 8, y: 22 }, { x: 9, y: 65 }
            ]
        }
        this.state=Object.assign(config,this.props)
        var data=this.state.data

        //缩放比例
        this.state.xScale = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.x;
        })).range([0, this.state.width-2*this.state.left]);
        var xScale = this.state.xScale
        this.state.yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) {
            return d.y;
        })]).range([this.state.height- 2*this.state.top, 0]);
        var yScale = this.state.yScale
        //line function
        var line = d3.line().x(function (d) {
                return xScale(d.x)
            }).y(function (d) {
                return yScale(d.y);
            }).curve(d3.curveCatmullRom.alpha(0.5))//.curve(d3.curveBundle.beta(0.5))//d3.curveCatmullRom.alpha(0.5)
        //linepath data
        this.state.d=line(data)
        this.state.xAxis = d3.axisBottom(xScale)
        this.state.yAxis = d3.axisLeft(yScale)
        window.l = this
    }
    componentWillReceiveProps() {
        console.log("componentWillReceiveProps", arguments)
    }
    shouldComponentUpdate() {
        console.log("shouldComponentUpdate", arguments)
        return true
    }
    componentWillUpdate() {
        console.log("componentWillUpdate", arguments)
    }
    componentDidUpdate() {
        console.log("componentDidUpdate", arguments)
    }
    componentWillMount() {
        console.log("componentWillMount", arguments)
    }
    componentDidMount() {
        console.log("componentDidMount", arguments)
        d3.select("#main").append('g').call(this.state.yAxis)
        d3.select("#main").append('g').attr("transform","translate(0,"+(this.state.height-2*this.state.top)+")").call(this.state.xAxis)
    }
    render() {
        return (<div><svg style={{
            width: this.state.width,
            height: this.state.height,
            userSelect: "none"
        }}>
            <g ref="g" id="main" style={{ "transform": 'translate(' + this.state.left + 'px, ' + this.state.top + 'px)'}}>
                {this.state.data.map(item => {
                    return <circle cx={this.state.xScale(item.x)} cy={this.state.yScale(item.y)} r="4" stroke="black" strokeWidth="1" fill="none" />
                })}
                <path d={this.state.d} fill="none" strokeWidth="1px" stroke="red"></path>
            </g>
        </svg>
        <ul>
            {this.state.data.map(item=>{
                return <li>{"x: "+item.x+", y: "+item.y}</li>
            })}
        </ul>
        </div>)
    }
}
module.exports = Line
