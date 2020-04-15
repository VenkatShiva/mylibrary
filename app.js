const express = require('express');
const chalk = require('chalk');

const app = express();
app.get('/',function(req,res){
    res.send('Hello from My Library App..!');
})
const port = process.env.PORT || 8000; 
app.listen( port, function(){
    console.log(`Server started and listening on ${port}`);
})