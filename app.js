const http = require("http")
const fs=require("fs")
const path=require("path")
http.createServer(function(req,res){
    console.log(req.url)
    if(req.url=="/"){
        console.log("=======")
        fs.createReadStream("./build/index.html").pipe(res)
        return
    }else if(req.url=="/favicon.ico"){
        res.end('404')
    }else{
        try {
            console.log(path.join("./build", req.url))
            fs.createReadStream(path.join("./build", req.url)).pipe(res)
        } catch (error) {
            res.end('404')
        }
        
    }
}).listen(80)