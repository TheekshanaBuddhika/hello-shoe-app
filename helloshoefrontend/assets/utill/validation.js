document.getElementById("login-wrapper").style.display = "flex";
document.getElementById("dboard-wrapper").style.display = "none";

$(document).ready(function () {
  $("#userEmail").keyup(function () {
    validateEmail();
  });

  $("#userPassword").keyup(function () {
    validatePasswordLength();
  });
});

function validateEmail() {
  var userEmail = $("#userEmail").val();

  // Regular expression for validating email format
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(userEmail)) {
    $("#emailError").text("Please enter a valid email address");
    return false;
  } else {
    $("#emailError").text("");
    return true;
  }
}

function validatePasswordLength() {
  var userPassword = $("#userPassword").val();

  // Validate password length
  if (userPassword.length < 8) {
    $("#passwordError").text("Password must be at least 8 characters long");
  } else {
    $("#passwordError").text("");
  }
}

function validateForm() {
  validateEmail();
  validatePasswordLength();

  var userEmail = $("#userEmail").val();
  var userPassword = $("#userPassword").val();

  if (!userEmail.trim() && !userPassword.trim()) {
    $("#emailError").text("Email is required");
    $("#passwordError").text("Password is required");
    return false;
  } else {
    $("#emailError").text("");
    $("#passwordError").text("");
  }

  // Validate email
  if (!userEmail.trim()) {
    $("#emailError").text("Email is required");
    return false; // Return false to prevent form submission
  } else {
    $("#emailError").text("");
  }

  // Validate password
  if (!userPassword.trim()) {
    $("#passwordError").text("Password is required");
    return false; // Return false to prevent form submission
  } else {
    $("#passwordError").text("");
  }

  // Validation passed
  return true;
}
