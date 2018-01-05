const React = require("react")
const { Component } = require("react")
const ReactDom = require("react-dom")
class Area extends Component {
    constructor(props) {
        super(props)
        //data x y width:600 height:300 top:50 left:50
        var config = {
            width: 1100,
            height: 600,
            innerRadius:0,
            outerRadius:250,
            data :[
                { "number": 4, "name": "Locke" },
                { "number": 8, "name": "Reyes" },
                { "number": 15, "name": "Ford" },
                { "number": 16, "name": "Jarrah" },
                { "number": 23, "name": "Shephard" },
                { "number": 42, "name": "Kwon" }
            ]
        }
        this.state = Object.assign(config, this.props)
        this.state. arcdata = d3.pie()
            .value(function (d) { return d.number; })
            (this.state.data);
        this.state.arc = d3.arc().innerRadius(this.state.innerRadius)
            .outerRadius(this.state.outerRadius)
        window.arc = this
        console.log("rotate(" + ((this.state.arcdata[0].endAngle + this.state.arcdata[0].startAngle) * 360 * 0 / 4 / Math.PI) + "  " + (this.state.outerRadius / 2) + ",10)")
    }
    componentWillReceiveProps(nextprops) {
        
    }
    shouldComponentUpdate(props, nextstate) {
        console.log(this.state.data, nextstate.data)
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
    }
    render() {
        console.log("render")
        return (<div><svg style={{
            width: this.state.width,
            height: this.state.height,
            userSelect: "none"
        }}>
            <g ref="g" style={{ "transform": 'translate(' + (this.state.width / 2) + 'px, ' + (this.state.height / 2) + 'px)' }}>
                {this.state.arcdata.map(item => {
                    console.log(item)
                    return (<path d={this.state.arc(item)} fill={"rgba(" + Math.round(Math.random() * 256) + "," + Math.round(Math.random() * 256) + "," + Math.round(Math.random() * 256) + "," + (Math.random()/2+0.5) + ")"}>
                            </path>)
                })}
                {this.state.arcdata.map(item => {
                    return (<text fontSize="20px" fill="red" x={this.state.outerRadius / 2 + ""} y="20" transform={"rotate(" + ((item.endAngle + item.startAngle) * 360 / 4 / Math.PI - 90) + "  " + 0 + ",10)"}>{item.data.name+":"+item.data.number}
                    </text>)
                })}
            </g>
        </svg>
            <ul>
                {this.state.arcdata.map((item,index)=>{
                    return <li>{item.data.name+"  :  "+item.data.number}</li>
                })}
            </ul>
        </div>)
    }
}
module.exports = Area
