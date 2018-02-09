const React = require("react")
const Component = React.Component
const ReactDom = require("react-dom")

const Progress = require('./components/progress.js')
const Span = require('./components/span.js')
const ChinaMap = require("./components/chinaMap.js")

const d3 = require("d3")
window.d3 = d3
class App extends Component {
    constructor(props) {
        super(props)
        var data = require('../json/data.js')
        data.mapData = require('../newChina.js')
        var details = {
            "新疆": require("../json/xin_jiang.geo.js"),
            "西藏": require("../json/xi_zang.geo.js"),
            "内蒙古": require("../json/nei_meng_gu.geo.js"),
            "青海": require("../json/qing_hai.geo.js"),
            "四川": require("../json/si_chuan.geo.js"),
            "黑龙江": require("../json/hei_long_jiang.geo.js"),
            "甘肃": require("../json/gan_su.geo.js"),
            "云南": require("../json/yun_nan.geo.js"),
            "广西": require("../json/guang_xi.geo.js"),
            "湖南": require("../json/hu_nan.geo.js"),
            "陕西": require("../json/shan_xi_1.geo.js"),
            "广东": require("../json/guang_dong.geo.js"),
            "吉林": require("../json/ji_lin.geo.js"),
            "河北": require("../json/he_bei.geo.js"),
            "湖北": require("../json/hu_bei.geo.js"),
            "贵州": require("../json/gui_zhou.geo.js"),
            "山东": require("../json/shan_dong.geo.js"),
            "江西": require("../json/jiang_xi.geo.js"),
            "河南": require("../json/he_nan.geo.js"),
            "辽宁": require("../json/liao_ning.geo.js"),
            "陕西": require("../json/shan_xi_2.geo.js"),
            "安徽": require("../json/an_hui.geo.js"),
            "福建": require("../json/fu_jian.geo.js"),
            "浙江": require("../json/zhe_jiang.geo.js"),
            "江苏": require("../json/jiang_su.geo.js"),
            "重庆": require("../json/chong_qing.geo.js"),
            "宁夏": require("../json/ning_xia.geo.js"),
            "海南": require("../json/hai_nan.geo.js"),
            "北京": require("../json/bei_jing.geo.js"),
            "天津": require("../json/tian_jin.geo.js"),
            "上海": require("../json/shang_hai.geo.js")
        }
        data.children.forEach(item => {
            item.mapData = details[item.name]
        })
        data.children.forEach(item => {
            item.name
            data.mapData.features.forEach(i => {
                if (i.id == item.name) {
                    item.cp = i.properties.cp
                    item.size = i.properties.size
                }
            });
        });
        data.children.forEach(item => {
            item.children.forEach(i => {
                i.att1 = Math.ceil(Math.random() * 1000)
                i.att2 = Math.ceil(Math.random() * Math.random() * i.att1)
                i.att3 = i.att1 - i.att2
            })
        });
        data.children.forEach(item => {
            item.att1 = 0
            item.att2 = 0
            item.att3 = 0
            item.children.forEach(i => {
                item.att1 += i.att1
                item.att2 += i.att2
                item.att3 += i.att3
            })
        })
        data.att1 = 0
        data.att2 = 0
        data.att3 = 0
        data.children.forEach(item => {
            data.att1 += item.att1
            data.att2 += item.att2
            data.att3 += item.att3
        })
        this.state = {
            data: data,
            select: data,
            focus: ''
        }
        window.tt = this
    }
    focus(e, item) {
        var children = this.state.select.children
        for (var i = 0; i < children.length; i++) {
            if (children[i].name == ((item.id - 0) == item.id ? item.properties.name : item.id)) {
                this.setState({
                    focus: children[i]
                })
                break;
            }
        }
    }
    select(e, item) {
        var children = this.state.select.children
        if (this.state.select.name != '全国') {
            return
        }
        for (var i = 0; i < children.length; i++) {
            if (children[i].name == ((item.id - 0) == item.id ? item.properties.name : item.id)) {
                this.setState({
                    select: children[i]
                })
                break;
            }
        }
    }
    render() {
        var selectArr = [this.state.select.att1, this.state.select.att2, this.state.select.att3]
        var focusArr = [this.state.focus.att1, this.state.focus.att2, this.state.focus.att3]
        var selectMax = Math.max(...selectArr)
        var focusMax = Math.max(...focusArr)
        return (
            <div
                style={{
                    width: '100%',
                    display: 'flex'
                }}
            ><div style={{
                flex: '1',
                textAlign: 'left'
            }} >
                    <h2>{this.state.select.name}</h2>
                    <p>考生人数:</p>
                    <Span str={selectArr[0]}/>
                    <p>交卷人数:{selectArr[1]}</p>
                    <Progress v={selectArr[1] / selectMax} ></Progress>
                    <p>在考人数:{selectArr[2]}</p>
                    <Progress v={selectArr[2] / selectMax} ></Progress>
                </div>
                <div id='wrap' style={{
                    width: '70%',
                    display: 'inline-block',
                    position : 'relative'
                }}>
                    <button style={{
                        display: this.state.select.name=="全国"?'none':'block',
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        zIndex : 100
                    }} className='btn btn-primary'
                    onClick={()=>{
                        console.log('btn click')
                        this.setState({
                            select: this.state.data,
                            focus: ''
                        })
                    }}
                    >返回</button>
                    <h1></h1>
                    <ChinaMap focus={
                        this.focus.bind(this)
                    } select={
                        this.select.bind(this)
                    } features={this.state.select.mapData.features} cp={this.state.select.cp} scale={this.state.select.size} />
                </div>
                <div style={{
                    flex: '1',
                    textAlign: 'left'
                }}>
                    <p style={{
                        opacity: !this.state.focus?'1':'0',
                        color: 'red',
                        height: !this.state.focus ? '1rem' : '0',
                        margin: !this.state.focus ? '1rem' : '0',
                    }}
                    >请鼠标移动到地图上或者点击选着省份</p>
                    <h2 style={{
                        opacity: this.state.focus ? '1' : '0'
                    }}>{this.state.focus.name}</h2>
                    <p style={{
                        opacity: this.state.focus ? '1' : '0'
                    }}>考生人数:</p>
                    <Span style={{
                        opacity: this.state.focus ? '1' : '0'
                    }} str={focusArr[0]} />
                    <p style={{
                        opacity: this.state.focus ? '1' : '0'
                    }}>交卷人数:{focusArr[1]}</p>
                    <Progress style={{
                        opacity: this.state.focus ? '1' : '0'
                    }} v={focusArr[1] / focusMax} />
                    <p style={{
                        opacity: this.state.focus ? '1' : '0'
                    }}>在考人数:{focusArr[2]}</p>
                    <Progress style={{
                        opacity: this.state.focus ? '1' : '0'
                    }} v={focusArr[2] / focusMax } />
                </div>
            </div>)
    }
}
ReactDom.render(<App />, document.getElementById("root"))
