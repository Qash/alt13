$(function() {
    Parse.$ = jQuery;
 $('.alert-danger').hide();
 var form=true;
 refreshForm(form);
    // Replace this line with the one on your Quickstart Guide Page
 Parse.initialize("7MZs4simq83LcSZBqNsFBaGGIfLlczt1dnRA5AC8", "JNBnWNCXkRNpc1v0xgZdwAWbiFlUpBcIP70BzMnK");
 var currentUser = Parse.User.current();
 var pathArray=window.location.pathname.split( '/' );
 if(currentUser){
  if(pathArray[pathArray.length-1]=='./login.html'){
    window.location.assign('main.html');
  }
  $("#userSlot").text(currentUser.attributes.username);
 }else{
  if(pathArray[pathArray.length-1]!='login.html'){
    window.location.assign('login.html');
  }
 }
    // Initialize collapse button
  $('.button-collapse.menu').sideNav({
      menuWidth: 240, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
  $('.button-collapse.filter').sideNav({
      menuWidth: 240, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();
});

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
                $('#modal1').text(error.message);
                $('#modal1').openModal();
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
    $('#modal2').text(error.message);
    $('#modal2').openModal();
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