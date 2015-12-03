$(document).ready(function() {
    $("#register").click(function() {
        var name = $("#name").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var cpassword = $("#cpassword").val();
        if (name == '' || email == '' || password == '' || cpassword == '') {
            alert("Please fill all fields...!!!!!!");
        } else if ((password.length) < 6) {
            alert("Password should atleast 8 character in length...!!!!!!");
        } else if (!(password).match(cpassword)) {
            alert("Your passwords don't match. Try again?");
        } else {

                stuff.run();

               }

    });
});


  var stuff = {
                run: function () {
                    var data = {
                        name: $("#name").val(),
                        email: $("#email").val(),
                        employee_id: $("#employeeid").val(),
                        password: $("#password").val(),
                        joining_date:'',
                        active:'Y',
                        position:''
                    };
                    stuff.send(data);
                },

                send: function (object) {
                    $.ajax({
                    




                    }).done(function () {
                        window.alert("Registration Successful");
                                        });
                                         }
            };



