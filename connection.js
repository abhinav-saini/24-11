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

var check= function(cred,callback)
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

            collection.findOne({ email: cred.email, password: cred.password }, function(err, doc){
                if(err) throw err;

                if(doc) {
                    console.log("Found: " + cred.email + ", pass=" + cred.password);
                    callback(1);

                } else {
                    console.log("Not found: " + cred.email);
                    callback(0);
                }

                db.close();
            });

        }
    });
}

var checkDuplicate= function(email,callback)
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

            collection.findOne({ email: email}, function(err, doc){
                if(err)
                    throw err;

                if(doc) {
                    console.log(email + " already exists");
                    callback(1);

                } else {
                    console.log("Not found: " + email);
                    callback(0);
                }

                db.close();
            });

        }
    });
}


var addcomplaint= function(email,title,description,priority,now) {

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
            var collection = db.collection('complaints');

            //Create some complaint
            var data = {email:email,title:title,description:description,priority:priority,date:now};


            /* var user2 = {name: 'modulus user', age: 22, roles: ['user']};
             var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};*/

            // Insert some complaint
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "complaints" collection. The documents inserted with "_id" are:', result.length, result);
                }

                db.close();
            });

        }
    });
}


var addsuggestion= function(email,title,description,now) {

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
            var collection = db.collection('suggestions');

            //Create some suggestion
            var data = {email:email,title:title,description:description,date:now};


            /* var user2 = {name: 'modulus user', age: 22, roles: ['user']};
             var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};*/

            // Insert some complaint
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "suggestions" collection. The documents inserted with "_id" are:', result.length, result);
                }

                db.close();
            });

        }
    });
}


var addidea= function(email,title,description,product,now) {

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
            var collection = db.collection('productideas');

            //Create some productideas
            var data = {email:email,title:title,description:description,product:product,date:now};


            /* var user2 = {name: 'modulus user', age: 22, roles: ['user']};
             var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};*/

            // Insert some productidea
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "productideas" collection. The documents inserted with "_id" are:', result.length, result);
                }

                db.close();
            });

        }
    });
}


var addtask= function(email,assigned,completed,description,assigner,now) {

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
            var collection = db.collection('employeetracker');

            //Create some productideas
            var data = {email:email,assignedat:assigned,completedat:completed,description:description,assigner:assigner,postdate:now};


            /* var user2 = {name: 'modulus user', age: 22, roles: ['user']};
             var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};*/

            // Insert some productidea
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "employeetracker" collection. The documents inserted with "_id" are:', result.length, result);
                }

                db.close();
            });

        }
    });
}


var updateuser = function(cred,callback) {

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

            if(cred.newemail==""&&cred.newname!="")
            {
                collection.update({ email: cred.email },
                    { $set:
                    {
                        name:cred.newname,
                        employeeid:cred.newemployeeid,
                        joining_date:cred.newjoining,
                        position:cred.newposition
                    }
                    }, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('User Profile Updated');
                    }
                    db.close();
                });
                callback(0);
            }

            else if(cred.newemail!=""&&cred.newname=="")
            {
                collection.update({email:cred.email },
                    { $set:
                    {
                        email:cred.newemail,
                        employeeid:cred.newemployeeid,
                        joining_date:cred.newjoining,
                        position:cred.newposition
                    }
                    }, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('User Profile Updated');
                        }

                        db.close();
                    });
                callback(1);
            }

            else if(cred.newemail!=""&&cred.newname!="")
            {
                collection.update({email:cred.email },
                    { $set:
                    {
                        email:cred.newemail,
                        name:cred.newname,
                        employeeid:cred.newemployeeid,
                        joining_date:cred.newjoining,
                        position:cred.newposition
                    }
                    }, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('User Profile Updated');
                        }

                        db.close();
                    });
                callback(1);
            }


            else if(cred.newemail==""&&cred.newname=="")
            {
                collection.update({ email: cred.email },
                    { $set:
                    {
                        employeeid:cred.newemployeeid,
                        joining_date:cred.newjoining,
                        position:cred.newposition
                    }
                    }, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('User Profile Updated');
                        }

                        db.close();
                    });
                callback(0);
            }

        }
    });
}


///////////////////////////////////////////FETCHING/////////////////////////////////////////////////////////////////

/* var fetcher= function(callback) {

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

            collection.find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(result);
                }

            });
        }
    });
} */

var addmeeting= function(email,requestdate,reason,companions) {

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
            var collection = db.collection('waitingqueue');

            //Create some meeting
            var data = {email:email,requestdate:requestdate,reason:reason,companions:companions};


            // Insert some meeting
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "waitingqueue" collection. The documents inserted with "_id" are:', result.length, result);
                }

                db.close();
            });

        }
    });
}






module.exports.add=add;
module.exports.check=check;
module.exports.checkDuplicate = checkDuplicate;
module.exports.addcomplaint=addcomplaint;
module.exports.addsuggestion=addsuggestion;
module.exports.addidea=addidea;
module.exports.addtask=addtask;
module.exports.updateuser=updateuser;
//module.exports.fetcher=fetcher;
module.exports.addmeeting=addmeeting;