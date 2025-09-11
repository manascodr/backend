let http = require('http');

let server = http.createServer((req,res)=>{ // creating server
    res.end('Hello World');
})

server.listen(3000,()=>{ // server started
    console.log("Server is running on port 3000");
})