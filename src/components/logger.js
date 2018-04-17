const React = require("react")
const { Component } = require("react")
const d3 = require("d3")
class Logger extends Component{
    constructor(props){
        super(props)
        this.props.data.map(item=>item)
        this.state={
            data: this.props.data.map(item => item)
        }
        window.s=this
    }
    getDefaultProps(){
        return {
            a:1
        }
    }
    componentWillReceiveProps(){
        console.log("componentWillReceiveProps",arguments)
    }
    shouldComponentUpdate(nextprops, nextstate) {
        console.log("arc shouldComponentUpdate")
        return true
    }
    componentWillUpdate(){
        console.log("componentWillUpdate", arguments)
    }
    componentDidUpdate(){
        console.log("componentDidUpdate", arguments)
    }
    componentWillMount(){
        console.log("componentWillMount", arguments)
    }
    componentDidMount(){
        console.log("componentDidMount", arguments)
        setTimeout(() => {
            console.log("__")
           this.setState({data:[1,2,3]}) 
        }, 300);
    }
    render(){
        return (<ul>
            {this.state.data.map(item=>{
                return <li>{item.toString()}</li>
            })}
        </ul>)
    }
}
module.exports=Logger
