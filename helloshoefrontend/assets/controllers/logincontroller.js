class user {
  constructor(email, password, jwt, profilePic, role) {
    this.email = email;
    this.password = password;
    this.jwt = jwt;
    this.profilePic = profilePic;
    this.role = role;
  }
}

$("#loginForm")[0].reset();

$("#signInBtn").click(function (e) {
  e.preventDefault();

  var username = $("#userEmail").val();
  var password = $("#userPassword").val();
  var data = {
    username: username,
    password: password,
  };

  if ($("#userEmail").val() === "" || $("#userPassword").val() === "") {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Enter email or password!",
    });
    return;
  }

  console.log(data);

  $.ajax({
    url: BASE_URL + "api/auth/login",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function (res) {
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res));
      console.log(JSON.parse(localStorage.getItem("user")).jwt);
      console.log(JSON.parse(localStorage.getItem("user")).profilePic);
      console.log(JSON.parse(localStorage.getItem("user")).role);
      console.log(JSON.parse(localStorage.getItem("user")).username);

      if (
        JSON.parse(localStorage.getItem("user")).role === "ADMIN" ||
        JSON.parse(localStorage.getItem("user")).role === "SUPER_ADMIN"
      ) {
        window.location.href = "index2.html";
      } else if (JSON.parse(localStorage.getItem("user")).role === "USER") {
        window.location.href = "index2.html";
      } else {
        alert("invalid !");
      }
    },
    error: function (res) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid username or password!",
      });
    },
  });
});
