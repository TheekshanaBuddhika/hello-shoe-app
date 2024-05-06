class user {
  constructor(email, password, jwt, profilePic, role) {
    this.email = email;
    this.password = password;
    this.jwt = jwt;
    this.profilePic = profilePic;
    this.role = role;
  }
}

$("#signInBtn").click(function (e) {
  e.preventDefault();

  document.getElementById("login-wrapper").style.display = "none";
  document.getElementById("dboard-wrapper").style.display = "flex";

  // Call validateForm function from validation.js
  // if (validateForm()) {
  //   var email = $("#userEmail").val();
  //   var password = $("#userPassword").val();
  //   var data = {
  //     email: email,
  //     password: password,
  //   };

  //   console.log(data);

  //   $.ajax({
  //     url: BASE_URL + "auth/login",
  //     type: "POST",
  //     contentType: "application/json",
  //     data: JSON.stringify(data),
  //     success: function (res) {
  //       console.log(res);
  //       localStorage.setItem("user", JSON.stringify(res));
  //       var userRole = res.role;
  //       if (userRole === "ADMIN_USER" || userRole === "USER") {
  //       $("#login-wrapper").css("display", "flex");
  //         if (userRole !== "ADMIN_USER") {
  //           $(".admin-item").hide();
  $("#admin_content").css("display", "block");

  //         }
  getUserDetails();
  //       } else {
  //         $("#errorMessage").text("Invalid User");
  //       }
  //     },
  //     error: function (res) {
  //       console.error("Login request failed:", res);
  //     },
  //   });
  // }
});
