// http(module) -> express(package) -> framework

let express = require('express');//importing express package
let app = express(); // server created

app.get('/home',(req,res)=>{ // route created
    res.send('Welcome to Home Page'); // sending response
})
app.get('/about',(req,res)=>{ // route created
    res.send('Welcome to About Page'); // sending response
})

app.listen(3000,()=>{ // server started
    console.log("Server is running on port 3000");
})