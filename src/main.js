const React = require("react")
const Component = React.Component
const ReactDom = require("react-dom")

const Logger = require("./components/logger.js")
const Line = require("./components/line.js")
const Area = require("./components/area.js")
const Arc = require("./components/arc.js")
const Bar = require("./components/bar.js")
const ChinaMap = require("./components/chinaMap.js")
// console.log(reReactact)

const d3 = require("d3")
window.d3 = d3
class App extends Component {
    constructor() {
        super()
        this.state = {
            lineData: [
                { x: 0, y: 70 }, { x: 1, y: 35 },
                { x: 2, y: 23 }, { x: 3, y: 78 },
                { x: 4, y: 55 }, { x: 5, y: 18 },
                { x: 6, y: 98 }, { x: 7, y: 100 },
                { x: 8, y: 22 }, { x: 9, y: 65 }
            ]
        }
        window.t = this
        setTimeout(()=>{
            this.setState({
                line:0
            })
        },3000)
    }
    render() {
        if (this.state.line != 0) {
            return (
                <div>
                    <h1>Line</h1>
                    <Line></Line>
                    <h1>Area</h1>
                    <Area ></Area>
                    <h1>Arc</h1>
                    <Arc ></Arc>
                    <h1>Bar</h1>
                    <Bar />
                    <h1>ChinaMap</h1>
                    <ChinaMap />
                </div>)
        } else {
            return (
                <div>
                    <h1>Line</h1>
                    <Line data={this.state.lineData}></Line>
                    <h1>Area</h1>
                    <Area data={[
                        {date: new Date(2007, 3, 24), value: 60.24 },
                        {date: new Date(2007, 3, 25), value: 75.35 },
                        {date: new Date(2007, 3, 26), value: 80.84 },
                        {date: new Date(2007, 3, 27), value: 93.92 },
                        {date: new Date(2007, 3, 30), value: 97.80 },
                        {date: new Date(2007, 4, 1), value: 99.47 }
                    ]}></Area>
                    <h1>Arc</h1>
                    <Arc data={[{ "number": 20, "name": "Locke" },
                    { "number": 30, "name": "Reyes" },
                    { "number": 19, "name": "Ford" },
                    { "number": 23, "name": "Jarrah" },
                    { "number": 10, "name": "Shephard" },
                    { "number": 8, "name": "Kwon" }
                    ]}></Arc>
                    <h1>Bar</h1>
                    <Bar data={[{ "number": 8, "name": "Locke" },
                        { "number": 88, "name": "Reyes" },
                        { "number": 38, "name": "Ford" },
                        { "number": 58, "name": "Jarrah" },
                        { "number": 28, "name": "Shephard" },
                        { "number": 18, "name": "Kwon" }]}/>
                    <h1>ChinaMap</h1>
                    <ChinaMap />
                </div>)
        }
    }
}
ReactDom.render(<App />, document.getElementById("root"))
