$(function() {
    Parse.$ = jQuery;
 $('.alert-danger').hide();
 var form=true;
 refreshForm(form);
    // Replace this line with the one on your Quickstart Guide Page
 Parse.initialize("7MZs4simq83LcSZBqNsFBaGGIfLlczt1dnRA5AC8", "JNBnWNCXkRNpc1v0xgZdwAWbiFlUpBcIP70BzMnK");
 var currentUser = Parse.User.current();
 if(currentUser){
  if(window.location=='http://alt13.parseapp.com/login.html'){
    window.location.assign('main.html');
  }
  $("#userSlot").text(currentUser.attributes.username);
 }else{
  if(window.location!='http://alt13.parseapp.com/login.html'){
    window.location.assign('login.html');
  }
 }
  
});
function signUp(){
  var user = new Parse.User();
  user.set("username", $());
  user.set("password", "my pass");
  user.set("email", "email@example.com");

  // other fields can be set just like with Parse.Object

  user.signUp(null, {
    success: function(user) {
        // Hooray! Let them use the app now.
    },
    error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
    }
  });
}

$('#logForm').on('submit', function(e) {
 
    // Prevent Default Submit Event
     e.preventDefault();
 
 
        //get values
        var username = $("#loginField").val();
        var password = $("#pwdField").val();
 
        Parse.User.logIn(username, password, {
            success:function(user) {
                currentUser = user;
                window.location.assign('main.html');
            },
            error:function(user, error) {
                $('.alert-danger').show();
                $('.alert-danger').text(error.message);
            }
        });
});

$('#signForm').on('submit', function(e) {
 
    // Prevent Default Submit Event
     e.preventDefault();
 
 var user = new Parse.User();
user.set("username", $("#signForm #loginField").val());
user.set("password", $("#signForm #pwdField").val());
user.set("email", $("#signForm #mailField").val());
 
user.signUp(null, {
  success: function(user) {
    currentUser = user;
    window.location.assign('main.html');
  },
  error: function(user, error) {
    $('.alert-danger').show();
    $('.alert-danger').text(error.message);
  }
});
});

function refreshForm(a){
  if(a){
    $('#signForm').hide();
    $('#logForm').show();
  }else{
    $('#signForm').show();
    $('#logForm').hide();
  }
}