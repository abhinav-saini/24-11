/**
 * Created by abhinav on 3/12/15.
 */
var express = require("express");
var app = express();
var http = require('http');
var fs = require('fs');
var path = require('path');


var connection = require("../connection");

module.exports = function(app){
    app.get('/', function(req, res){
        res.render("login.html");
    });

    app.get('/adduser', function(req, res){
        res.render("login.html");
        var name = req.param('name');
        var email = req.param('email');
        var employeeid = req.param('employeeid');
        var password = req.param('password');
        var position='';
        var joining_date= '';
        var active= 'Y';

        console.log("Name: " + name + " Email: " + email + "Employee id: " +employeeid);

        connection.add(name,email,employeeid,password,position,joining_date,active);


    });

    app.get('/loginopen', function(req, res){
        res.render("login.html");


    });

    app.get('/registeropen', function(req, res){
        res.render("register.html");


    });

    app.get('/checkuser', function(req, res){

        var email = req.param('email');
        var password = req.param('password');

        console.log(" Email: " + email);
       connection.check(email,password);


    });



}