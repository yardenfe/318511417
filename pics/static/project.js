
function empty(){
  if (document.new_user.email.value==""){
    alert("some of your fields are empty");
    return false;
  }
  if( document.new_user.username.value == "" ) {
    alert( "Please fill in your first name" );
    document.NewAccount.fname.focus() ;
    return false;
  }
  if( document.new_user.password.value == "" ) {
    alert( "Please fill in your last name" );
    document.NewAccount.lname.focus() ;
    return false;
  }
  
  }