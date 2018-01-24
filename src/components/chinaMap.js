const React = require("react")
const { Component } = require("react")
const ReactDom = require("react-dom")
class ChinaMap extends Component {
    constructor(props) {
        super(props)
        this.state={
            url: ""
        }
        window.m=this
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
        var svg = d3.select(this.refs.svg)

        var projection = d3.geo.mercator()
            .center([107, 31])
            .scale(850)
            .translate([width / 2, height / 2]);

        var path = d3.geo.path()
            .projection(projection);


        var color = d3.scale.category20();


        d3.json(this.state.url, function (error, root) {

            if (error)
                return console.error(error);
            console.log(root.features);

            svg.selectAll("path")
                .data(root.features)
                .enter()
                .append("path")
                .attr("stroke", "#000")
                .attr("stroke-width", 1)
                .attr("fill", function (d, i) {
                    return color(i);
                })
                .attr("d", path)
                .on("mouseover", function (d, i) {
                    d3.select(this)
                        .attr("fill", "yellow");
                })
                .on("mouseout", function (d, i) {
                    d3.select(this)
                        .attr("fill", color(i));
                });

        });

        // console.log("componentDidMount", arguments)
    }
    render() {
        return (
            <div>
                <input type='file' onChange={(e)=>{
                    var read=new FileReader()
                    read.addEventListener('load',(e)=>{
                        console.log(e.target.result)
                        var blob = new Blob([e.target.result])
                        console.log(blob)
                        var url=URL.createObjectURL(blob)
                        this.setState({
                            url:url
                        })
                    })
                    console.log(e.target.files)
                    if (e.target.files.length>0){
                        read.readAsArrayBuffer(e.target.files[0])
                    }
                }}/>
                <svg ref="svg" style={{
                    width: 1000,
                    height: 800,
                    userSelect: "none"
                }}></svg>
            </div>
        )
    }
}
module.exports = ChinaMap
