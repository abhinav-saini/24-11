/**
 * Created by abhinav on 3/12/15.
 */
var express = require("express");
var app = express();
var http = require('http');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser());
app.use(express.static(__dirname + "/public", {maxAge: 3456700000}));
var connection = require("../connection");
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({secret: '1234567890QWERTY'}));

var router = express.Router();


module.exports = function(app){
    app.get('/', function(req, res){
        res.render("login.html");
    });


    app.post('/adduser', function(req, res){

        var name = req.body.name;
        var email = req.body.email;
        var employeeid = req.body.employeeid;
        var password = req.body.password;
        var position='';
        var joining_date= '';
        var active= 'Y';

        console.log("Name: " + name + " Email: " + email + "Employee id: " +employeeid);

        connection.checkDuplicate(email, function(val){

            if(val==1){

                //res.send(500,"show-alert");
                res.render("register.html", {value:1});
                //res.send("value exists");

            }
            else {
                connection.add(name,email,employeeid,password,position,joining_date,active);
                res.render("login.html");
            }
        });
    });


    app.get('/loginopen', function(req, res){
        res.render("login.html");

    });


    app.get('/registeropen', function(req, res){
        res.render("register.html");
    });


    app.get('/index.html', function(req, res){

        if (req.session.email!=null) {
            var email=req.session.email;
            res.render("index.html",{"email":email});
        }
        else
        {
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
        }
    });

    app.get('/adminindex.html', function(req, res){

        if (req.session.email!=null) {
            var email=req.session.email;
            res.render("adminindex.html",{"email":email});
        }
        else
        {
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
        }
    });


    app.post('/checkuser', function(req, res) {

        req.session.email = req.body.email;

        var email = req.body.email;
        var password = req.body.password;

        console.log(" Email: " + email + " Pass: " + password);

        //console.log(" Email: " + email);
        var cred = {
            email : email,
            password : password
        }
        connection.check(cred,function(o)
            {
                if (req.session.email && o==1) {

                    res.redirect("index.html");
                }

                else if(req.session.email&&o==0)
                {
                    req.session.email=null;
                    res.end('<div><h1>Username and password is invalid!</h1></div></br><a href="/loginopen">Click here to login again</a>');
                }
                else if(req.session.email&&o==2)
                {
                    res.redirect("adminindex.html");
                }

            }
        );
    });


    app.get('/updateprofile', function(req, res){

        if(req.session.email!=null)
            res.render("updateprofile.html");
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><h4><a href="/loginopen">Click here to login</a></h4>');
    });


    app.get('/update', function(req, res){
        res.redirect("index.html");

        var cred={
            email:req.session.email,
            newname:req.param('newname'),
            newemail:req.param('newemail'),
            newjoining:req.param('updatedjoining'),
            newposition:req.param('updatedposition'),
            newemployeeid:req.param('updatedemployeeid')}

        connection.updateuser(cred,function(o)
            {
                if(o==1)
                {
                    req.session.email=cred.newemail;
                    console.log("Email Address Updated to "+req.session.email);
                }
            }
        );
    });




    app.get('/logout', function(req, res){
        console.log("Logged out from "+req.session.email);
        req.session.email=null;
        res.redirect("/");

    });


    app.get('/complaints', function(req, res){

        if(req.session.email!=null)
            res.render("complaints.html");
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });


    app.get('/addcomplaint', function(req, res){
        res.redirect("index.html");
        var email = req.session.email;
        var title = req.param('title');
        var description = req.param('description');
        var priority=req.param('priority');
        var d = new Date();
        var now = d.toLocaleString();

        console.log("Title: " + title + "Description: " +description);

        connection.addcomplaint(email,title,description,priority,now);
    });


    app.get('/suggestions', function(req, res){

        if(req.session.email!=null)
            res.render("suggestions.html");
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });


    app.get('/addsuggestion', function(req, res){
        res.redirect("index.html");
        var email = req.session.email;
        var title = req.param('title');
        var description = req.param('description');
        var d = new Date();
        var now = d.toLocaleString();

        console.log("Title: " + title + "Description: " +description);

        connection.addsuggestion(email,title,description,now);
    });


    app.get('/productideas', function(req, res){

        if(req.session.email!=null)
            res.render("productideas.html");
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });


    app.get('/addidea', function(req, res){
        res.redirect("index.html");
        var email = req.session.email;
        var title = req.param('title');
        var description = req.param('description');
        var product = req.param('product');
        var d = new Date();
        var now = d.toLocaleString();

        console.log("Title: " + title + "Description: " +description+ "Product: " +product);

        connection.addidea(email,title,description,product,now);
    });


    app.get('/employeetracker', function(req, res){

        if(req.session.email!=null)
            res.render("employeetracker.html");
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });


    app.get('/addtask', function(req, res){
        res.redirect("index.html");
        var email = req.session.email;
        var assigned = req.param('assigndate')+" "+req.param('assigntime');
        var completed = req.param('completeddate')+" "+req.param('completedtime');
        var description = req.param('description');
        var assigner = req.param('assigner');
        var d = new Date();
        var now = d.toLocaleString();

        console.log("Task assigned at: " + assigned + " Task completed at: " + completed +" Description: " +description+ " Assigner: " +assigner);

        connection.addtask(email,assigned,completed,description,assigner,now);
    });



    /* ////FETCHER///
     app.get('/fetching', function(req, res){

     connection.fetcher(function(data)
     {
     res.render("testing.html",{"data":data});
     }
     );
     });  */

    app.get('/waitingqueue', function(req, res){

        if(req.session.email!=null)
            res.render("waitingqueue.html");
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });

    app.get('/addmeeting', function(req, res){
        res.redirect("index.html");
        var email = req.session.email;

        var d = new Date();
        var requestdate= d.toDateString()+" "+req.param('requesttime');

        // var assigned = req.param('assigndate')+" "+req.param('assigntime');
        var reason = req.param('reason');
        var priority = req.param('priority');
        var companions = req.param('companions');
        //var d = new Date();
        //var now = d.toLocaleString();

        console.log("Requested by: " + email + " Requested at: " + requestdate);

        connection.addmeeting(email,requestdate,reason,priority,companions);
    });

    app.get('/employeeexperience', function(req, res){

        if(req.session.email!=null)
            res.render("employeeexperience.html");
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });


    app.get('/addexperience', function(req, res){
        res.redirect("index.html");
        var email = req.session.email;

        var title = req.param('title');
        var description = req.param('description');
        var d = new Date();
        var now = d.toLocaleString();

        console.log("Experienced by: " + email + " Experienced at: " + now);

        connection.addexperience(email,title,description,now);
    });

///////////////////////////////////////////////////ADMIN ROUTES//////////////////////////////////////////////////////


    app.get('/acomplaints', function(req, res){

        if(req.session.email!=null)
        {
            connection.loadcomplaints(function(data) {
                res.render("acomplaints.html", {data: data});

            });
        }

        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });

    app.get('/asuggestions', function(req, res){

        if(req.session.email!=null)
        {
            connection.loadsuggestions(function(data) {
                res.render("asuggestions.html", {data: data});

            });

        }

        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });

    app.get('/aproductideas', function(req, res){

        if(req.session.email!=null)
        {
            connection.loadideas(function(data) {
                res.render("aproductideas.html", {data: data});

            });

        }

        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });

    app.get('/loadname', function(req, res){

        if(req.session.email!=null)
        {
            connection.loadname("rajesh@gmail.com",function(data) {
                console.log(data);
                res.send(data);

            });

        }
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });

    app.get('/aemployeetracker', function(req, res){

        if(req.session.email!=null)
        {
            connection.loadallnames(function(data) {
                console.log(data);
                res.render("aemployeetracker.html",{data:data});
            });

        }

        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });

    app.get('/track', function(req, res){

        if(req.session.email!=null)
        {
            var email=req.param('email');
            console.log(email);
            connection.loadtasks(email,function(data){
                res.render("atracker.html",{data:data});

            });

        }
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });

    app.get('/awaitingqueue', function(req, res){

        if(req.session.email!=null)
        {
            connection.loadallmeetings(function(data) {
                console.log(data);
                res.render("awaitingqueue.html",{data:data});
            });
        }

        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });


    app.get('/aemployeeexperience', function(req, res){

        if(req.session.email!=null)
        {
            connection.loadallnames(function(data) {
                console.log(data);
                res.render("aemployeeexperience.html",{data:data});
            });

        }

        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });

    app.get('/checkexperience', function(req, res){

        if(req.session.email!=null)
        {
            var email=req.param('email');
            connection.loadexperience(email,function(data){
                res.render("acheckexperience.html",{data:data});

            });

        }
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });


    app.get('/removetask', function(req, res){

        if(req.session.email!=null)
        {
            var email=req.param('email');
            var taskid=req.param('taskid');


            cred={
                email:email,
                taskid:taskid
            }
            connection.removetask(cred,function(data){
                console.log("Documents Updated");
                console.log(data);
                var email=req.param('email');
                connection.loadtasks(email,function(data){
                    res.render("atracker.html",{data:data});

                });

            });

        }
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });


    app.get('/removeexperience', function(req, res){

        if(req.session.email!=null)
        {
            var email=req.param('email');
            var experienceid=req.param('experienceid');


            cred={
                email:email,
                experienceid:experienceid
            }
            connection.removeexperience(cred,function(data){
                console.log("Documents Updated");
                console.log(data);
                var email=req.param('email');
                connection.loadexperience(email,function(data){
                    res.render("acheckexperience.html",{data:data});

                });

            });

        }
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });


    app.get('/removemeeting', function(req, res){

        if(req.session.email!=null)
        {
            var email=req.param('email');
            var meetingid=req.param('meetingid');


            cred={
                email:email,
                meetingid:meetingid
            }
            connection.removemeeting(cred,function(data){
                console.log("Documents Updated");
                console.log(data);
                connection.loadallmeetings(function(data){
                    res.render("awaitingqueue.html",{data:data});

                });

            });

        }
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });


    app.get('/removeidea', function(req, res){

        if(req.session.email!=null)
        {
            var email=req.param('email');
            var ideaid=req.param('ideaid');

            cred={
                email:email,
                ideaid:ideaid
            }
            connection.removeidea(cred,function(data){
                console.log("Documents Updated");
                console.log(data);
                connection.loadideas(function(data){
                    res.render("aproductideas.html",{data:data});

                });

            });

        }
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });


    app.get('/removesuggestion', function(req, res){

        if(req.session.email!=null)
        {
            var email=req.param('email');
            var suggestionid=req.param('suggestionid');

            cred={
                email:email,
                suggestionid:suggestionid
            }
            connection.removesuggestion(cred,function(data){
                console.log("Documents Updated");
                console.log(data);
                connection.loadsuggestions(function(data){
                    res.render("asuggestions.html",{data:data});

                });

            });

        }
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });


    app.get('/removecomplaint', function(req, res){

        if(req.session.email!=null)
        {
            var email=req.param('email');
            var complaintid=req.param('complaintid');

            cred={
                email:email,
                complaintid:complaintid
            }
            connection.removecomplaint(cred,function(data){
                console.log("Documents Updated");
                console.log(data);
                connection.loadcomplaints(function(data){
                    res.render("acomplaints.html",{data:data});

                });

            });

        }
        else
            res.end('<div><h1>You are not authorized to view this page!</h1></div></br><a href="/loginopen">Click here to login</a>');
    });



}