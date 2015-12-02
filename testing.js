
    var mongodb = require('mongodb');
    var assert = require('assert');
    var ObjectId = require('mongodb').ObjectID;

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
    var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://localhost:3000/';

// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('users');

            //Create some users
            var user1 = { name: $("#name").val(),
                email: $("#email").val(),
                employee_id: $("#employeeid").val(),
                password: $("#password").val(),
                joining_date:'',
                active:'Y',
                position:''};


            // Insert some users
            collection.insert([user1], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                }


                //Close connection
                db.close();


            });
        }
    });


