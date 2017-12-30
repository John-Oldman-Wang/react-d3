const React = require("react")
const { Component } = require("react")
const ReactDom = require("react-dom")
// console.log(reReactact)

const d3 = require("d3")
class Hello extends Component {
    constructor() {
        super()
    }
    render() {
        return (<h1>Hello,World !</h1>)
    }
}
ReactDom.render(<Hello />, document.getElementById("root"))
var a = [0,[1], 10, 30];
console.log(d3.quantile(a, 0) ); // 0
console.log (d3.quantile(a, 0.5)); // 10
console.log (d3.quantile(a, 1)); // 30
console.log (d3.quantile(a, 0.25)); // 5
console.log (d3.quantile(a, 0.75)); // 20
console.log (d3.quantile(a, 0.1)); // 2