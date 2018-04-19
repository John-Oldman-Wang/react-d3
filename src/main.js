import { relative } from "path";

const Line = require("./components/line.js")
const Area = require("./components/area.js")
const Arc = require("./components/arc.js")
const Bar = require("./components/bar.js")
const ChinaMap = require("./components/chinaMap.js")
// console.log(reReactact)
const React = require('react')
const ReactDom = require('react-dom')
const Component = React.Component
const d3 = require("d3")
function format(t, ...arr) {
    if (!t) {
        // console.log(arr.reduce)
        // console.log(arr.reduce((a, b) => a + b, 0))
        return format(new Date(), ...arr)
    }
    var t = new Date()
    var year = t.getFullYear()
    var month = t.getMonth()
    var date = t.getDate() + arr.reduce((a, b) => a + b, 0)
    return new Date(year, month, date)
}
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
            lineData: [
                { x: 0, y: 40 }, { x: 1, y: 35 },
                { x: 2, y: 23 }, { x: 3, y: 78 },
                { x: 4, y: 55 }, { x: 5, y: 18 },
                { x: 6, y: 98 }, { x: 7, y: 100 },
                { x: 8, y: 22 }, { x: 9, y: 65 }
            ],
            areaData: [
                { date: format(), value: 93.24 },
                { date: format(null, 2), value: 95.35 },
                { date: format(null, 2, 3), value: 98.84 },
                { date: format(null, 2, 3, 2), value: 99.92 },
                { date: format(null, 2, 3, 2, 4), value: 99.80 },
                { date: format(null, 2, 3, 2, 4, 2), value: 99.47 }
            ],
            data: data,
            select: data,
            focus: ''
        }
    }
    select(e,item){
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
    focus(e,item){
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
    render() {
        return (
            <div>
                <h1>Line</h1>
                <Line data={this.state.lineData}></Line>
                <h1>Area</h1>
                <Area data={this.state.areaData}></Area>
                <h1>Arc</h1>
                <Arc />
                <h1>ChinaMap</h1>
                <div style={{
                    position: `relative`,
                    width:`800px`,
                }}>
                    <button style={{
                        display: this.state.select.name == "全国" ? 'none' : 'block',
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        zIndex: 100
                    }} className='btn btn-primary'
                        onClick={() => {
                            this.setState({
                                select: this.state.data,
                                focus: ''
                            })
                        }}
                    >返回</button>
                    <ChinaMap
                        focus={
                            this.focus.bind(this)
                        }
                        select={
                            this.select.bind(this)
                        }
                        features={this.state.select.mapData.features}
                        cp={this.state.select.cp}
                        scale={this.state.select.size}
                    />
                </div>
                
            </div>)
    }
}
const app = ReactDom.render(<App />, document.getElementById('root'))
function random(min, max) {
    return ((Math.random() * (max - min) + min) * 100 | 0) / 100
}
function true_false(){
    return !! (Math.random()>0.5)
}
setInterval(() => {
    var arr = []
    var areaArr=[]
    for (var i = 0; i < 10; i++) {
        arr.push({ x: i, y: random(0, 100) })
        areaArr.push( true_false()?2:3 )
    }
    app.setState({
        lineData: arr,
        areaData: [
            { date: format(null, ...areaArr.slice(0,0) ), value:  random(90, 100) },
            { date: format(null, ...areaArr.slice(0, 1)), value:  random(90, 100) },
            { date: format(null, ...areaArr.slice(0, 2)), value:  random(90, 100) },
            { date: format(null, ...areaArr.slice(0, 3)), value:  random(90, 100) },
            { date: format(null, ...areaArr.slice(0, 4)), value:  random(90, 100) },
            { date: format(null, ...areaArr.slice(0, 5)), value:  random(90, 100) }
        ]
    })
}, 2200);
