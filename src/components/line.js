const React = require("react")
const { Component } = require("react")
const d3 = require("d3")
class Line extends Component {
    constructor(props) {
        super(props)
        var config = {
            width: 800,
            height: 600*800/1000,
            top: 50,
            left: 50,
            data: [
                { x: 0, y: 40 }, { x: 1, y: 35 },
                { x: 2, y: 23 }, { x: 3, y: 78 },
                { x: 4, y: 55 }, { x: 5, y: 18 },
                { x: 6, y: 98 }, { x: 7, y: 100 },
                { x: 8, y: 22 }, { x: 9, y: 65 }
            ]
        }
        this.state = Object.assign(config, this.props)
    }
    componentWillReceiveProps(nextprops) {
        this.setState(Object.assign({}, this.state, nextprops))
    }
    shouldComponentUpdate(nextprops, nextstate) {
        return true
    }
    componentWillUpdate() {
    }
    componentDidUpdate() {
        window.d3=d3
        d3.select("#lineAxis").select("g").remove()
        d3.select("#lineAxis").select("g").remove()
        var data = this.state.data
        var xScale = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.x;
        })).range([0, this.state.width - 2 * this.state.left]);
        var yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) {
            return d.y;
        })]).range([this.state.height - 2 * this.state.top, 0]);
        var xAxis = d3.axisBottom(xScale)
        var yAxis = d3.axisLeft(yScale)
        d3.select("#lineAxis").append('g').call(yAxis)
        d3.select("#lineAxis").append('g').attr("transform", "translate(0," + (this.state.height - 2 * this.state.top) + ")").call(xAxis)
    }
    componentWillMount() {
        // console.log("componentWillMount", arguments)
    }
    componentDidMount() {
        // console.log("componentDidMount", arguments)
        var data = this.state.data
        var xScale = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.x;
        })).range([0, this.state.width - 2 * this.state.left]);
        var yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) {
            return d.y;
        })]).range([this.state.height - 2 * this.state.top, 0]);
        var xAxis = d3.axisBottom(xScale)//.ticks(9).tickSize(-this.state.height, 0, 0)
        var yAxis = d3.axisLeft(yScale)//.ticks(10).tickSize(-this.state.width,0,0)
        d3.select("#lineAxis").append('g').call(yAxis)
        d3.select("#lineAxis").append('g').attr("transform", "translate(0," + (this.state.height - 2 * this.state.top) + ")").call(xAxis)
    }
    render() {
        var data = this.state.data
        var xScale = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.x;
        })).range([0, this.state.width - 2 * this.state.left]);
        var yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) {
            return d.y;
        })]).range([this.state.height - 2 * this.state.top, 0]);
        var line = d3.line().x(function (d) {
            return xScale(d.x)
        }).y(function (d) {
            return yScale(d.y);
        }).curve(d3.curveCatmullRom.alpha(0.5))
        return (<div
            style={{
                display: `flex`,
                justifyContent: `flex-start`
            }}
        ><div
            style={{
                width: `800px`
            }}
        ><div
            style={{
                width: '100%',//this.state.width,
                position: 'relative',
                //overflow: 'hidden',
                paddingBottom: this.state.height / this.state.width * 100 + '%',
            }}
        >
            <svg
                viewBox={"0 0 " + this.state.width + " " + this.state.height}
                preserveAspectRatio="xMinYMin meet"
                style={{
                    width: '100%',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    bottom: '0',
                    userSelect: "none"
                }}>
                <g ref="g" style={{ "transform": 'translate(' + this.state.left + 'px, ' + this.state.top + 'px)' }}>
                    <path d={line(data)} fill="none" strokeWidth="1px" stroke="#604f9f"></path>
                    {this.state.data.map((item, index) => {
                        return <circle key={index} cx={xScale(item.x)} cy={yScale(item.y)} r="4" stroke="black" strokeWidth="1" fill="#fff" />
                    })}
                </g>
                <g id="lineAxis" style={{ "transform": 'translate(' + this.state.left + 'px, ' + this.state.top + 'px)' }}></g>
            </svg>
        </div>
        </div>
            <div>
                {/* <h3>this is data of the line</h3> */}
                <ul style={{
                    listStyle: 'none',
                    textAlign: `left`,
                    padding: `0px`,
                    margin: `0px 20px 0px 30px`,
                    width: `200px`
                }}>
                    {this.state.data.map((item, index) => {
                        return <li key={index}>{"x: " + item.x + ", y: " + item.y}</li>
                    })}
                </ul>
            </div>
        </div>)
    }
}
module.exports = Line
export default Line