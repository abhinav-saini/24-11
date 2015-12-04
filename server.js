/**
 * Created by abhinav on 3/12/15.
 */
var express = require("express");
var app = express();
var ejs = require("ejs");

var router = require("./routes/main1")(app);

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);


var server = app.listen(3000, function(err){
    if(err)
        console.log("Error in Server");

    console.log("Server listening to port" + server.address().port);
});