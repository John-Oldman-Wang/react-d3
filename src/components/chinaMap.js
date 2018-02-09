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
    // constructor(props) {
    //     super(props)
    //     var root = require('../../newChina.js')
    //     var details = {
    //         "新疆": require("../../json/xin_jiang.geo.js"),
    //         "西藏": require("../../json/xi_zang.geo.js"),
    //         "内蒙古": require("../../json/nei_meng_gu.geo.js"),
    //         "青海": require("../../json/qing_hai.geo.js"),
    //         "四川": require("../../json/si_chuan.geo.js"),
    //         "黑龙江": require("../../json/hei_long_jiang.geo.js"),
    //         "甘肃": require("../../json/gan_su.geo.js"),
    //         "云南": require("../../json/yun_nan.geo.js"),
    //         "广西": require("../../json/guang_xi.geo.js"),
    //         "湖南": require("../../json/hu_nan.geo.js"),
    //         "陕西": require("../../json/shan_xi_1.geo.js"),
    //         "广东": require("../../json/guang_dong.geo.js"),
    //         "吉林": require("../../json/ji_lin.geo.js"),
    //         "河北": require("../../json/he_bei.geo.js"),
    //         "湖北": require("../../json/hu_bei.geo.js"),
    //         "贵州": require("../../json/gui_zhou.geo.js"),
    //         "山东": require("../../json/shan_dong.geo.js"),
    //         "江西": require("../../json/jiang_xi.geo.js"),
    //         "河南": require("../../json/he_nan.geo.js"),
    //         "辽宁": require("../../json/liao_ning.geo.js"),
    //         "陕西": require("../../json/shan_xi_2.geo.js"),
    //         "安徽": require("../../json/an_hui.geo.js"),
    //         "福建": require("../../json/fu_jian.geo.js"),
    //         "浙江": require("../../json/zhe_jiang.geo.js"),
    //         "江苏": require("../../json/jiang_su.geo.js"),
    //         "重庆": require("../../json/chong_qing.geo.js"),
    //         "宁夏": require("../../json/ning_xia.geo.js"),
    //         "海南": require("../../json/hai_nan.geo.js"),
    //         "北京": require("../../json/bei_jing.geo.js"),
    //         "天津": require("../../json/tian_jin.geo.js"),
    //         "上海": require("../../json/shang_hai.geo.js")
    //     }
    //     this.state = {
    //         features: root.features,
    //         details: details,
    //         focus: '',
    //         choose: ''
    //     }
    //     window.m = this
    // }
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
        const { features, cp, scale } = this.props
        projection = d3.geoMercator()
            .center(cp || [107, 31]) //
            .scale(!scale ? Math.min(config.width, config.height) : scale * 3) //
            .translate(cp ? [config.width / 2, config.height / 2]: [config.width / 2 + 30, config.height / 2 + 0.15 * config.height]);
        path = d3.geoPath().projection(projection);
        return (<div
            style={{
                width: '100%',
                position: 'relative',
                paddingBottom: config.height / config.width * 100 + '%',
            }}>
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
            ><g>{
                features.map((item, index) => {
                    return (<path
                        key={index}
                        fill={color[index]}
                        d={path(item)}
                        stroke='#222'
                        strokeWidth='1'
                        onMouseOver={(e) => {
                            e.target.setAttribute('fill', 'yellow')
                            this.props.focus(e, item)
                        }}
                        onMouseOut={function (e) {
                            e.target.setAttribute('fill', color[index])
                        }}
                        onClick={(e) => {
                            this.props.select(e, item)
                        }}
                    >
                    </path>
                    )
                })
            }</g><g>{features.map((item, index) => {
                var xy = path.centroid(item)
                return (<text
                    key={index}
                    x={xy[0]}
                    y={xy[1]}
                    fill="#000" >{item.properties.name}</text>)
            })}</g>
            </svg></div>
        )
        /*
        if (this.state.focus == '') {
            projection = d3.geoMercator()
                .center([107, 31]) //
                .scale(Math.min(config.width, config.height)) //
                .translate([config.width / 2 + 30, config.height / 2 + 0.15 * config.height]);
            path = d3.geoPath().projection(projection);
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
            var $projection = d3.geoMercator()
                .center(this.state.focus.properties.cp)//
                .scale((this.state.focus.properties.size || 1000) * 3)//
                .translate([config.width / 2, config.height / 2])
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
                        // border: '1px solid red'
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
        }*/
    }
}
module.exports = ChinaMap