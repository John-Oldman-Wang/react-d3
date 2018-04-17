const React = require("react")
const { Component } = require("react")
const d3 = require("d3")
class Arc extends Component {
    constructor(props) {
        super(props)
        var config = {
            width: 1100,
            height: 600,
            innerRadius: 150,
            outerRadius: 250,
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
        window.arc = this
    }
    componentWillReceiveProps(nextprops) {
        this.setState(Object.assign({}, this.state, nextprops))
        // console.log("arc componentWillReceiveProps", arguments)
    }
    shouldComponentUpdate(nextprops, nextstate) {
        // console.log("arc shouldComponentUpdate")
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
        // console.log("render")
        var arcdata = d3.pie().value(function (d) { return d.number; })(this.state.data)
        var arc = d3.arc().padAngle(2).padRadius(2).innerRadius(this.state.innerRadius).outerRadius(this.state.outerRadius)
        //console.log(arc.centroid)
        return (<div style={{
            display: `flex`,
            justifyContent: `flex-start`
        }}><div style={{
            width: `800px`
            }}><div style={{
                width: '100%',//this.state.width,
                position: 'relative',
                //overflow: 'hidden',
                paddingBottom: this.state.height / this.state.width * 100 + '%',
                }}><svg viewBox={"0 0 " + this.state.width + " " + this.state.height}
                    preserveAspectRatio="xMinYMin meet"
                    style={{
                        width: '100%',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        bottom: '0',
                        userSelect: "none"
                    }}>
            <g ref="g" style={{ "transform": 'translate(' + (this.state.width / 2) + 'px, ' + (this.state.height / 2) + 'px)' }}>
                {arcdata.map((item, index) => {
                    return (<path key={index} d={arc(item)} fill={"rgba(" + Math.round(Math.random() * 256) + "," + Math.round(Math.random() * 256) + "," + Math.round(Math.random() * 256) + "," + (Math.random() / 2 + 0.5) + ")"}>
                    </path>)
                })}
                {arcdata.map((item, index) => {
                    return (<text key={index} fontSize="20px" fill="#222" x={0} y={0} transform={"translate(" + arc.centroid(item)+ ")"}>{item.data.name + ":" + item.data.number}
                    </text>)
                })}
            </g>
        </svg></div>
            </div><ul style={{
                listStyle: 'none',
                textAlign: `left`,
                padding: `0px`,
                margin: `0px 20px 0px 30px`,
                width: `200px`
            }}>
                {arcdata.map((item, index) => {
                    return <li key={index}>{item.data.name + "  :  " + item.data.number}</li>
                })}
            </ul></div>)
    }
}
module.exports = Arc
export default Arc