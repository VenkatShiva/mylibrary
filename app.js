const express = require('express');
const chalk = require('chalk');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname,'public')));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'views','index.html'));
})
const port = process.env.PORT || 8000; 
app.listen( port, function(){
    console.log(`Server started and listening on  ${chalk.green(port)}`);
})