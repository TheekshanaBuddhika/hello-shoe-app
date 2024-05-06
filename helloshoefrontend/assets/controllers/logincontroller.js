class user {
  constructor(email, password, jwt, profilePic, role) {
    this.email = email;
    this.password = password;
    this.jwt = jwt;
    this.profilePic = profilePic;
    this.role = role;
  }
}

$(document).ready(function () {
  $("#signInBtn").click(function (e) {
    e.preventDefault();

    // Call validateForm function from validation.js
    if (validateForm()) {
      var email = $("#userEmail").val();
      var password = $("#userPassword").val();
      var data = {
        email: email,
        password: password,
      };

      console.log(data);

      document.getElementById("dboard-wrapper").style.display = "flex";
      document.getElementById("login-wrapper").style.display = "none";

      $.ajax({
        url: BASE_URL + "auth/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (res) {
          console.log(res);
          localStorage.setItem("user", JSON.stringify(res));
          (result) => {
            if (
              JSON.parse(localStorage.getItem("user")).role === "ADMIN" ||
              JSON.parse(localStorage.getItem("user")).role === "SUPER_ADMIN"
            ) {
              window.location.href = "page/admin/";
            } else if (
              JSON.parse(localStorage.getItem("user")).role === "USER"
            ) {
            } else {
              alert("invalid !");
            }
          };
        },
        error: function (res) {},
      });
    } else {
      // Form validation failed, do nothing or show error message
      console.log("Form validation failed.");
    }
  });
});
