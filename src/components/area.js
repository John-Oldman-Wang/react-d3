const React = require("react")
const { Component } = require("react")
const ReactDom = require("react-dom")
class Area extends Component {
    constructor(props) {
        super(props)
        var config = {
            width: 1100,
            height: 600,
            top: 50,
            left: 50,
            data: [
                { date: new Date(2007, 3, 24), value: 93.24 },
                { date: new Date(2007, 3, 25), value: 95.35 },
                { date: new Date(2007, 3, 26), value: 98.84 },
                { date: new Date(2007, 3, 27), value: 99.92 },
                { date: new Date(2007, 3, 30), value: 99.80 },
                { date: new Date(2007, 4, 1), value: 99.47 }
            ]
        }
        this.state = Object.assign(config, this.props)
        window.area = this
    }
    componentWillReceiveProps(nextprops) {
        console.log("componentWillReceiveProps", arguments)
    }
    shouldComponentUpdate(nextprops, nextstate) {
        console.log("arc shouldComponentUpdate")
        return true
    }
    componentWillUpdate() {
        console.log("componentWillUpdate", arguments)
    }
    componentDidUpdate() {
        console.log("componentDidUpdate", arguments)
        d3.select("#main").select("g").remove()
        var data = this.state.data
        var xScale = d3.scaleTime().domain(d3.extent(data, function (d) {
            return d.date;
        })).range([0, this.state.width - 2 * this.state.left])
        var yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) {
            return d.value;
        })]).range([this.state.height - 2 * this.state.top, 0])
        var xAxis = d3.axisBottom(xScale)
        var yAxis = d3.axisLeft(yScale)
        d3.select("#main").append('g').call(yAxis)
        d3.select("#main").append('g').attr("transform", "translate(0," + (this.state.height - 2 * this.state.top) + ")").call(xAxis)
    }
    componentWillMount() {
        console.log("componentWillMount", arguments)
    }
    componentDidMount() {
        console.log("componentDidMount", arguments)
        var data = this.state.data
        var xScale = d3.scaleTime().domain(d3.extent(data, function (d) {
            return d.date;
        })).range([0, this.state.width - 2 * this.state.left])
        var yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) {
            return d.value;
        })]).range([this.state.height - 2 * this.state.top, 0])
        var xAxis = d3.axisBottom(xScale)
        var yAxis = d3.axisLeft(yScale)
        d3.select("#main").append('g').call(yAxis)
        d3.select("#main").append('g').attr("transform", "translate(0," + (this.state.height - 2 * this.state.top) + ")").call(xAxis)
    }
    render() {
        console.log("render")
        var data = this.state.data
        var xScale = d3.scaleTime().domain(d3.extent(data, function (d) {
            return d.date;
        })).range([0, this.state.width - 2 * this.state.left])
        var yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) {
            return d.value;
        })]).range([this.state.height - 2 * this.state.top, 0])

        var area = d3.area().x(function (d) {
            return xScale(d.date)
        }).y1(function (d) {
            return yScale(d.value);
        }).y0(function () {
            return yScale(0);
        }).curve(d3.curveCatmullRom.alpha(0.5))
        var xAxis = d3.axisBottom(xScale)
        var yAxis = d3.axisLeft(yScale)
        return (<div><svg style={{
            width: this.state.width,
            height: this.state.height,
            userSelect: "none"
        }}>
            <g ref="g" style={{ "transform": 'translate(' + this.state.left + 'px, ' + this.state.top + 'px)' }}>
                {this.state.data.map((item, index) => {
                    return <circle key={index} cx={xScale(item.date)} cy={yScale(item.value)} r="4" stroke="black" strokeWidth="1" fill="none" />
                })}
                <path d={area(this.state.data)} fill="rgba(0,0,200,0.5)" strokeWidth="1px" stroke="rgba(0,0,200,0.5)"></path>
            </g>
            <g id="main" style={{ "transform": 'translate(' + this.state.left + 'px, ' + this.state.top + 'px)' }}></g>
        </svg>
            <ul>
                {this.state.data.map((item, index) => {
                    return <li key={index}>{"x: " + item.date + ", y: " + item.value}</li>
                })}
            </ul>
        </div>)
    }
}
module.exports = Area