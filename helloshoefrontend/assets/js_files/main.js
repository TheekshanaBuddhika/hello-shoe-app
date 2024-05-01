$(document).ready(function () {
  $("#signInBtn").click(function (e) {
    e.preventDefault();

    // Call validateForm function from validation.js
    if (validateForm()) {
      // Form validation passed, proceed with sign-in logic
      alert("Form validation passed. Signing in...");
      // Make AJAX request, etc.
    } else {
      // Form validation failed, do nothing or show error message
      console.log("Form validation failed.");
    }
  });
});
