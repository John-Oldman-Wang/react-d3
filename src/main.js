const React = require("react")
const Component = React.Component
const ReactDom = require("react-dom")

const Logger = require("./components/logger.js")
const Line = require("./components/line.js")
const Area = require("./components/area.js")
const Arc = require("./components/arc.js")
// console.log(reReactact)

const d3 = require("d3")
window.d3 = d3
class App extends Component {
    constructor() {
        super()
        this.state = {
            lineData: [
                { x: 0, y: 40 }, { x: 1, y: 35 },
                { x: 2, y: 23 }, { x: 3, y: 78 },
                { x: 4, y: 55 }, { x: 5, y: 18 },
                { x: 6, y: 98 }, { x: 7, y: 100 },
                { x: 8, y: 22 }, { x: 9, y: 65 }
            ]
        }
        window.t = this
        // setTimeout(()=>{
        //     this.setState({
        //         line:0
        //     })
        // },3000)
    }
    render() {
        if (this.state.line != 0) {
            return (
                <div>
                    <h1>Line</h1>
                    <Line data={this.state.lineData}></Line>
                    <h1>Area</h1>
                    <Area ></Area>
                    <h1>Arc</h1>
                    <Arc ></Arc>
                </div>)
        } else {
            return (
                <div>
                    <h1>Line</h1>
                    <Line data={this.state.lineData}></Line>
                    <h1>Area</h1>
                    <Area ></Area>
                    <h1>Arc</h1>
                    <Arc data={[{ "number": 8, "name": "Locke" },
                    { "number": 8, "name": "Reyes" },
                    { "number": 8, "name": "Ford" },
                    { "number": 8, "name": "Jarrah" },
                    { "number": 8, "name": "Shephard" },
                    { "number": 8, "name": "Kwon" }
                    ]}></Arc>
                </div>)
        }
    }
}
ReactDom.render(<App />, document.getElementById("root"))
