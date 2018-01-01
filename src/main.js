const React = require("react")
const { Component } = require("react")
const ReactDom = require("react-dom")

const Logger=require("./components/logger.js")
// console.log(reReactact)

const d3 = require("d3")
window.d3=d3
class App extends Component {
    constructor() {
        super()
        this.state={
            arr: [0, [1], 10, 30],
            results:[]
        }
        window.t=this
    }
    getDefaultProps() {
        return {
            a: 1
        }
    }
    render() {
        return (
            <div>
                <h1>result</h1>
                <Logger data={this.state.results} />
            </div>)
    }
}
ReactDom.render(<App />, document.getElementById("root"))