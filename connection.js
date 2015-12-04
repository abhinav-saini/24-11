/**
 * Created by abhinav on 3/12/15.
 */
var add= function(uname,uemail,uemployeeid,upassword,uposition,ujoining_date,uactive) {

    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;

    var url = 'mongodb://localhost:27017/HippoFeedo';

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('employees');

            //Create some users
            var data = {name:uname,email:uemail,employeeid:uemployeeid,password:upassword,position:uposition,joining_date:ujoining_date,active:uactive };


            /* var user2 = {name: 'modulus user', age: 22, roles: ['user']};
             var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};*/

            // Insert some users
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "employees" collection. The documents inserted with "_id" are:', result.length, result);
                }

                db.close();
            });

        }
    });
}

var check= function(uemail,upassword)
{

    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;

    var url = 'mongodb://localhost:27017/HippoFeedo';

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            var collection = db.collection('employees');

            collection.findOne({ email: uemail, password: upassword }, function(err, doc){
                if(err) throw err;

                if(doc) {
                    console.log("Found: " + uemail + ", pass=" + upassword);
                } else {
                    console.log("Not found: " + uemail);
                }

                db.close();
            });

        }
    });
}

module.exports.add=add;
module.exports.check=check;