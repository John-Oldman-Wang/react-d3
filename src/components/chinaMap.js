const React = require("react")
const {
    Component
} = require("react")
const ReactDom = require("react-dom")
window.React = React
const d3 = require("d3")
var color = d3.schemeCategory20;
color = color.concat(d3.schemeCategory20b);
color = color.concat(d3.schemeCategory20c);
var projection, path;

var config = {
    width: 1000,
    height: 800
}
class ChinaMap extends Component {
    constructor(props) {
        super(props)
        var root = require('../../newChina.js')
        var details = {
            "xin_jiang": require("../../json/xin_jiang.geo.js"),
            "xi_zang": require("../../json/xi_zang.geo.js"),
            "nei_meng_gu": require("../../json/nei_meng_gu.geo.js"),
            "qing_hai": require("../../json/qing_hai.geo.js"),
            "si_chuan": require("../../json/si_chuan.geo.js"),
            "hei_long_jiang": require("../../json/hei_long_jiang.geo.js"),
            "gan_su": require("../../json/gan_su.geo.js"),
            "yun_nan": require("../../json/yun_nan.geo.js"),
            "guang_xi": require("../../json/guang_xi.geo.js"),
            "hu_nan": require("../../json/hu_nan.geo.js"),
            "shan_xi_1": require("../../json/shan_xi_1.geo.js"),
            "guang_dong": require("../../json/guang_dong.geo.js"),
            "ji_lin": require("../../json/ji_lin.geo.js"),
            "he_bei": require("../../json/he_bei.geo.js"),
            "hu_bei": require("../../json/hu_bei.geo.js"),
            "gui_zhou": require("../../json/gui_zhou.geo.js"),
            "shan_dong": require("../../json/shan_dong.geo.js"),
            "jiang_xi": require("../../json/jiang_xi.geo.js"),
            "he_nan": require("../../json/he_nan.geo.js"),
            "liao_ning": require("../../json/liao_ning.geo.js"),
            "shan_xi_2": require("../../json/shan_xi_2.geo.js"),
            "an_hui": require("../../json/an_hui.geo.js"),
            "fu_jian": require("../../json/fu_jian.geo.js"),
            "zhe_jiang": require("../../json/zhe_jiang.geo.js"),
            "jiang_su": require("../../json/jiang_su.geo.js"),
            "chong_qing": require("../../json/chong_qing.geo.js"),
            "ning_xia": require("../../json/ning_xia.geo.js"),
            "hai_nan": require("../../json/hai_nan.geo.js"),
            "bei_jing": require("../../json/bei_jing.geo.js"),
            "tian_jin": require("../../json/tian_jin.geo.js"),
            "shang_hai": require("../../json/shang_hai.geo.js")
        }
        projection = d3.geoMercator()
            .center([107, 31])
            .scale(Math.min(config.width, config.height))
            .translate([config.width / 2 + 30, config.height / 2 + 0.15 * config.height]);
        path = d3.geoPath().projection(projection);
        this.state = {
            features: root.features,
            details: details,
            focus: '',
            choose: ''
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
            return (<div
                style={{
                    width: '100%',
                    position: 'relative',
                    paddingBottom: config.height / config.width * 100 + '%',
                }}

            >
                <svg
                    viewBox={"0 0 " + config.width + " " + config.height}
                    preserveAspectRatio="xMinYMin meet"
                    style={{
                        width: '100%',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        bottom: '0',
                        userSelect: "none"
                    }}
                    ref='svg'
                    className='map'
                >
                    <g>{
                        this.state.features.map((item, index) => {
                            return (<path key={
                                index
                            }
                                fill={
                                    color[index]
                                }
                                d={
                                    path(item)
                                }
                                stroke='#222'
                                strokeWidth='1'
                                onMouseOver={
                                    (e) => {
                                        var self = e.target
                                        self.setAttribute('fill', 'yellow')
                                    }
                                }
                                onMouseOut={
                                    (e) => {
                                        var self = e.target
                                        self.setAttribute('fill', color[index])
                                    }
                                }
                                onDoubleClick={
                                    (e) => {
                                        this.setState({
                                            focus: item
                                        })
                                    }
                                }>
                            </path>
                            )
                        })
                    }</g><g>{this.state.features.map((item, index) => {
                        var xy = path.centroid(item)
                        return (<text 
                            onClick={(e) => {
                                this.setState({
                                    focus: item
                                })
                            }}
                            key={index}
                            x={xy[0]}
                            y={xy[1]}
                            fill="#000" >{item.properties.name}</text>)
                    })}</g>
                </svg></div>
            )
        }
        else {
            var features = this.state.details[this.state.focus.id].features
            var $projection = d3.geoMercator().center(this.state.focus.properties.cp).scale((this.state.focus.properties.size || 1000) * 3).translate([config.width / 2, config.height / 2])
            var $path = d3.geoPath().projection($projection)
            var axis = $path.centroid(this.state.focus)
            return (<div >
                <svg ref="svg"
                    className='map'
                    style={{
                        width: config.width,
                        height: config.height,
                        userSelect: 'none',
                        transition: 'none',
                        border: '1px solid red'
                    }} >
                    <g onClick={(e) => {
                        e.stopPropagation()
                        setTimeout(() => {
                            this.setState({
                                focus: ''
                            })
                        }, 100);
                    }}
                    >{features.map((item, index) => {
                        var i = Object.assign({}, item)
                        delete i.properties
                        return (<path key={
                            index
                        }
                            fill={
                                color[index]
                            }
                            d={
                                $path(i)
                            }
                            stroke='#222'
                            strokeWidth='1'
                            onMouseOver={
                                (e) => {
                                    var self = e.target
                                    self.setAttribute('fill', 'yellow')
                                }
                            }
                            onMouseOut={
                                (e) => {
                                    var self = e.target
                                    self.setAttribute('fill', color[index])
                                }
                            } >
                        </path>
                        )
                    })
                    }{features.map((item, index) => {
                            var xy = $path.centroid(item)
                            return (<text key={
                                index
                            }
                                x={
                                    xy[0]
                                }
                                y={
                                    xy[1]
                                }
                                fill="#000" >
                                {
                                    item.properties.name
                                } </text>)
                        })
                    } </g></svg></div>
            )
        }
    }
}
module.exports = ChinaMap