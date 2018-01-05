const React = require("react")
const { Component } = require("react")
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
                { x: 0, y: 11 }, { x: 1, y: 35 },
                { x: 2, y: 23 }, { x: 3, y: 78 },
                { x: 4, y: 55 }, { x: 5, y: 18 },
                { x: 6, y: 98 }, { x: 7, y: 100 },
                { x: 8, y: 22 }, { x: 9, y: 65 }
            ]
        }
        window.t = this
    }
    render() {
        return (
            <div>
                <h1>Line</h1>
                <Line data={this.state.lineData}></Line>
                <h1>Area</h1>
                <Area ></Area>
                <h1>Arc</h1>
                <Arc ></Arc>
                {/* <Logger data={this.state.results} /> */}
            </div>)
    }
}
ReactDom.render(<App />, document.getElementById("root"))
