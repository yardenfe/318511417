
function empty() {
  if (document.new_user.email.value == "") {
    alert("Some of your fields are empty");
    document.new_user.email.focus();
    return false;
  }
  if (document.new_user.username.value == "") {
    alert("Some of your fields are empty");
    document.new_user.username.focus();
    return false;
  }
  if (document.new_user.password.value == "") {
    alert("Some of your fields are empty");
    document.new_user.password.focus();
    return false;
  }

  /*-------login page------*/
  if (document.login.password.value == "") {
    alert("you must complete all details");
    document.login.password.focus();
    return false;
  }
    if (document.login.username.value == "") {
    alert("you must complete all details");
    document.login.username.focus();
    return false;
  }

}

function FindTrip() {
    if (document.new_user.email.value == "") {
    alert("Some of your fields are empty");
    document.new_user.email.focus();
    return false;
  }

}