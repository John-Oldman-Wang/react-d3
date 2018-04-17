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
        console.log(arr.reduce)
        console.log(arr.reduce((a, b) => a + b, 0))
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
            ]
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
                <Arc ></Arc>
                {/* <h1>Bar</h1>
                <Bar /> */}
                {/* <h1>ChinaMap</h1>
                <ChinaMap /> */}
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
