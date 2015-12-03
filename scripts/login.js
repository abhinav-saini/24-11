/**
 * Created by abhinav on 30/11/15.
 */
$(document).ready(function() {
    $("#login").click(function() {
        var email = $("#email").val();
        var password = $("#password").val();
        if (email == '') {
            alert("Please enter your email address!");
        } else if (password=='') {
            alert("Please enter your password");
        } else {

            $(function() {
                stuff.run();
            });

        }

    });
});


var stuff = {

    run: function () {
        $.ajax( { url: "https://api.mongolab.com/api/1/databases/hippo/collections/employees?apiKey=4-w0lRqk2CkV-7wr2A93d2FwvxCpmndm",
            data: JSON.stringify(),
            type: "GET",
            contentType: "application/json",
            success: function(msg) {
                var hello=JSON.stringify(msg);
                alert(hello);
            } } )


    }
};