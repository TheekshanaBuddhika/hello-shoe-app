$("#btn-employee-modal").click(function () {
  $("#btn-add-emp").html('<i class="bi bi-person-fill-add"></i>Add Employee');
  $("#employee-modal").modal("show");
});

$("#emp-img").on("change", function () {
  const file = this.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    $("#emp-img-preview").attr("src", reader.result);
  };
});

// $("#btn-add-emp").click(function () {
//   let formData = new FormData();
//   const employee = {
//     empId: employeeId,
//     empName: $("#emp-name").val(),
//     gender: $("#emp-gender").val(),
//     emergencyContact: $("#emp-emg-contact").val(),
//     emergencyInfo: $("#emp-emg-guardian").val(),
//     role:
//       $("#emp-designation").val() === "Manager" || "manager" ? "ADMIN" : "USER",
//     status: $("#emp-civil-status").val(),
//     email: $("#emp-email").val(),
//     contact: $("#emp-contact").val(),
//     designation: $("#emp-designation").val(),
//     dob: $("#emp-dob").val(),
//     branchId: $("#emp-branch").val(),
//     address: {
//       lane: $("#emp-address-lane").val(),
//       mainCountry: $("#emp-address-country").val(),
//       mainCity: $("#emp-address-city").val(),
//       mainState: $("#emp-address-state").val(),
//       postalCode: $("#emp-address-code").val(),
//     },
//   };

//   if (
//     $(this).html() === '<i class="bi bi-person-fill-add"></i>Update Employee'
//   ) {
//     formData.append("employee", JSON.stringify(employee));
//     if ($("#emp-img")[0].files.length === 0) {
//       formData.append("image", new File([""], "notUpdate"));
//     } else {
//       formData.append("image", $("#emp-img")[0].files[0]);
//     }
//     Swal.fire({
//       title: "Updating...",
//       text: "Please wait while we update the employee.",
//       didOpen: () => {
//         Swal.showLoading();
//       },
//       willClose: () => {
//         Swal.hideLoading();
//       },
//     });
//     $.ajax({
//       url: BASE_URL + "api/v1/employee",
//       type: "PUT",
//       data: formData,
//       contentType: false,
//       processData: false,
//       headers: {
//         Authorization: "Bearer " + userdetail.jwt,
//       },
//       success: function (data) {
//         loadAllAdmins();
//         loadAllUsers();
//         $("#employee-modal").modal("hide");
//         const Toast = Swal.mixin({
//           toast: true,
//           position: "top-end",
//           showConfirmButton: false,
//           timer: 3000,
//           timerProgressBar: true,
//           didOpen: (toast) => {
//             toast.onmouseenter = Swal.stopTimer;
//             toast.onmouseleave = Swal.resumeTimer;
//           },
//         });
//         Toast.fire({
//           icon: "success",
//           title: data,
//         });
//         $("#employee-modal").modal("hide");
//       },
//       error: function (error) {
//         clearInterval(timerInterval);
//         const Toast = Swal.mixin({
//           toast: true,
//           position: "top-end",
//           showConfirmButton: false,
//           timer: 3000,
//           timerProgressBar: true,
//           didOpen: (toast) => {
//             toast.onmouseenter = Swal.stopTimer;
//             toast.onmouseleave = Swal.resumeTimer;
//           },
//         });
//         Toast.fire({
//           icon: "error",
//           title: "Failed to update employee",
//         });
//       },
//     });
//   } else {
//     formData.append("employee", JSON.stringify(employee));
//     formData.append("image", $("#emp-img")[0].files[0]);
//     Swal.fire({
//       title: "Updating...",
//       text: "Please wait while we saving the employee.",
//       didOpen: () => {
//         Swal.showLoading();
//       },
//       willClose: () => {
//         Swal.hideLoading();
//       },
//     });
//     $.ajax({
//       url: BASE_URL + "api/v1/employee",
//       type: "POST",
//       data: formData,
//       contentType: false,
//       processData: false,
//       headers: {
//         Authorization: "Bearer " + userdetail.jwt,
//       },
//       success: function (data) {
//         loadAllAdmins();
//         loadAllUsers();
//         $("#branch-modal").modal("hide");
//         const Toast = Swal.mixin({
//           toast: true,
//           position: "top-end",
//           showConfirmButton: false,
//           timer: 3000,
//           timerProgressBar: true,
//           didOpen: (toast) => {
//             toast.onmouseenter = Swal.stopTimer;
//             toast.onmouseleave = Swal.resumeTimer;
//           },
//         });
//         Toast.fire({
//           icon: "success",
//           title: data,
//         });
//         $("#employee-modal").modal("hide");
//       },
//       error: function (error) {
//         clearInterval(timerInterval);
//         const Toast = Swal.mixin({
//           toast: true,
//           position: "top-end",
//           showConfirmButton: false,
//           timer: 3000,
//           timerProgressBar: true,
//           didOpen: (toast) => {
//             toast.onmouseenter = Swal.stopTimer;
//             toast.onmouseleave = Swal.resumeTimer;
//           },
//         });
//         Toast.fire({
//           icon: "error",
//           title: "Failed to add employee",
//         });
//       },
//     });
//   }
// });

$("#btn-add-emp").click(function () {
  let formData = new FormData();
  const employee = {
    empId: employeeId,
    empName: $("#emp-name").val(),
    gender: $("#emp-gender").val(),
    emergencyContact: $("#emp-emg-contact").val(),
    emergencyInfo: $("#emp-emg-guardian").val(),
    role:
      $("#emp-designation").val().toLowerCase() === "manager"
        ? "ADMIN"
        : "USER",
    status: $("#emp-civil-status").val(),
    email: $("#emp-email").val(),
    contact: $("#emp-contact").val(),
    designation: $("#emp-designation").val(),
    dob: $("#emp-dob").val(),
    branchId: $("#emp-branch").val(),
    address: {
      lane: $("#emp-address-lane").val(),
      mainCountry: $("#emp-address-country").val(),
      mainCity: $("#emp-address-city").val(),
      mainState: $("#emp-address-state").val(),
      postalCode: $("#emp-address-code").val(),
    },
  };

  const requiredFields = [
    "empName",
    "gender",
    "emergencyContact",
    "emergencyInfo",
    "role",
    "status",
    "email",
    "contact",
    "designation",
    "dob",
    "branchId",
    "address.lane",
    "address.mainCountry",
    "address.mainCity",
    "address.mainState",
    "address.postalCode",
  ];

  for (const field of requiredFields) {
    const value = field
      .split(".")
      .reduce(
        (obj, key) => (obj && obj[key] !== undefined ? obj[key] : ""),
        employee
      );
    if (!value || value.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: `Please complete the ${field
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()} field.`,
        showConfirmButton: true,
      });
      return;
    }
  }

  const isUpdate =
    $(this).html() === '<i class="bi bi-person-fill-add"></i>Update Employee';

  formData.append("employee", JSON.stringify(employee));
  if (isUpdate) {
    if ($("#emp-img")[0].files.length === 0) {
      formData.append("image", new File([""], "notUpdate"));
    } else {
      formData.append("image", $("#emp-img")[0].files[0]);
    }
  } else {
    formData.append("image", $("#emp-img")[0].files[0]);
  }

  Swal.fire({
    title: isUpdate ? "Updating..." : "Saving...",
    text: isUpdate
      ? "Please wait while we update the employee."
      : "Please wait while we save the employee.",
    didOpen: () => {
      Swal.showLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
  });

  $.ajax({
    url: BASE_URL + "api/v1/employee",
    type: isUpdate ? "PUT" : "POST",
    data: formData,
    contentType: false,
    processData: false,
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      $("#employee-modal").modal("hide");
      Swal.close();
      $("#emp-info-row").empty();
      loadallinfo();
      loadAllAdmins();
      loadAllUsers();

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: data,
      });
    },
    error: function (error) {
      Swal.close();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: isUpdate
          ? "Failed to update employee"
          : "Failed to add employee",
      });
    },
  });
});

function loadBranchIds() {
  $.ajax({
    url: BASE_URL + "api/v1/branch",
    type: "GET",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      data.forEach((branch) => {
        $("#emp-branch").append(
          `<option value="${branch.branchId}">${branch.branchName}</option>`
        );
      });
    },
    error: function (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "session expired",
      });
    },
  });
}

loadBranchIds();

let employeeId;

function createEmployeeCard(employee) {
  return `
    <div class="col position-relative">
      <div class="card mt-3 border border-2 border-dark overflow-hidden">
        <div class="row">
          <!-- Left side: Profile Picture -->
          <div class="pe-1 col-4 d-flex justify-content-center align-items-center bg-dark">
            <img src="https://drive.google.com/thumbnail?id=${employee.profilePic}&sz=w1000" class="rounded-circle border border-white emp-loading-pic">
          </div>
          <!-- Right side: Employee Details -->
          <div class="col-8">
            <div class="employee-header "></div>
            <small class="text-center emp-id fs-6 fw-bold text-dark-emphasis">${employee.empId}</small>
            <h6 class="text-center fs-4 text-capitalize">${employee.empName}</h6>
            
            <div class="d-flex gap-5 justify-content-sm-between px-4">
            <small class="fw-bold">Designation</small>
            <small class="text-center fw-bold emp-designation">${employee.designation}</small>
          </div>
            <div class="d-flex gap-5 justify-content-sm-between px-4">
              <small class="fw-bold">Branch</small>
              <small class="fw-bold">${employee.branchName}</small>
            </div>
            <div class="d-flex gap-5 justify-content-sm-between px-4">
              <small class="fw-bold">Date of Birth</small>
              <small class="fw-bold dob">${employee.dob}</small>
            </div>
            <div class="d-flex gap-5 justify-content-sm-between px-4">
              <small class="fw-bold">Gender</small>
              <small class="fw-bold">${employee.gender}</small>
            </div>
            <div class="d-flex gap-5 justify-content-sm-between px-4">
              <small class="fw-bold">Email</small>
              <small class="fw-bold email">${employee.email}</small>
            </div>
            <div class="d-flex gap-5 justify-content-sm-between px-4">
              <small class="fw-bold">Contact No</small>
              <small class="fw-bold emp-contact">${employee.contact}</small>
            </div>     
            <div class="d-flex gap-5 mt-2 justify-content-sm-between px-4">
              <small class="fw-bold">Guardian Name</small>
              <small class="fw-bold emg-info">${employee.emergencyInfo}</small>
            </div>
            <div class="d-flex gap-5 mt-2 justify-content-sm-between px-4">
            <small class="fw-bold">Guardian Contacts</small>
            <small class="fw-bold emg-contact">${employee.emergencyContact}</small>
          </div>
            <hr>
            <div class="d-flex  justify-content-end bg-dark-subtle w-100 mb-2 rounded">
              <button class="btn btn-sm btn-outline-dark btn-edit-employee"><i class="bi bi-pen-fill"></i> Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function showErrorToast(message) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "error",
    title: message,
  });
}

$(document).ready(function () {
  if (userdetail.role === "SUPER_ADMIN") {
    loadallinfo();
  }

  if (userdetail.role === "ADMIN") {
    loadalladmin();
  }
});

function loadallinfo() {
  $.ajax({
    url: BASE_URL + "api/v1/branch",
    type: "GET",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      data.forEach((branch) => {
        $("#emp-info-row").append(`
        <span  class="fs-3 fw-bold text-white"
        >${branch.branchName}
      </span>
      <section
        class="row w-100 rounded border shadow-sm mt-3 d-flex flex-wrap ps-4 overflow-y-auto position-relative bg-dark-subtle"
        style="height: 490px"
        id="emp-branch-row-${branch.branchId}" // Unique ID for each branch row
      >
        <span class="fs-3 fw-bold text-dark"
          >Branch Manager</span
        >
        <section
          class="row row-cols-md-2 w-100"
          id="emp-manager-row-${branch.branchId}" // Unique ID for managers row in this branch
        ></section>
        <span class="fs-3 fw-bold text-dark"
          >Branch Employees</span
        >
        <section
          class="row row-cols-md-2 mb-3 w-100 mt-3 d-flex justify-content-evenly"
          id="emp-cashier-row-${branch.branchId}" // Unique ID for employees row in this branch
        ></section>
      </section>
        `);
        loadAllbranchManagers(branch.branchId);
        loadAllNormEmployees(branch.branchId);
      });
    },
    error: function (error) {
      showErrorToast("Session expired");
    },
  });
}

function loadAllbranchManagers(branchId) {
  $.ajax({
    url: BASE_URL + "api/v1/employee/admin",
    type: "GET",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      console.log(data);
      const managers = data.filter(
        (employee) => employee.branchId === branchId
      );
      managers.forEach((manager) => {
        $(`#emp-manager-row-${branchId}`).append(createEmployeeCard(manager));
      });
      $(".btn-edit-employee").on("click", function () {
        let branchId = $(this).closest(".card");
        $("#btn-add-emp").html(
          '<i class="bi bi-person-fill-add"></i>Update Employee'
        );
        $("#emp-email").prop("disabled", true);
        employeeId = branchId.find(".emp-id").text();
        console.log(employeeId);

        $.ajax({
          url: BASE_URL + "api/v1/employee/" + employeeId,
          type: "GET",
          headers: {
            Authorization: "Bearer " + userdetail.jwt,
          },
          success: function (data) {
            $("#emp-name").val(data.empName);
            $("#emp-gender").val(data.gender);
            $("#emp-contact").val(data.contact);
            $("#emp-email").val(data.email);
            $("#emp-designation").val(data.designation);
            $("#emp-dob").val(data.dob);
            $("#emp-emg-guardian").val(data.emergencyInfo);
            $("#emp-emg-contact").val(data.emergencyContact);
            $("#emp-civil-status").val(data.status);
            $("#emp-branch").val(data.branchId);
            $("#emp-address-lane").val(data.address.lane);
            $("#emp-address-country").val(data.address.mainCountry);
            $("#emp-address-city").val(data.address.mainCity);
            $("#emp-address-state").val(data.address.mainState);
            $("#emp-address-code").val(data.address.postalCode);
            $("#emp-img-preview").attr(
              "src",
              "https://drive.google.com/thumbnail?id=" +
                data.profilePic +
                "&sz=w1000"
            );
            $("#employee-modal").modal("show");
          },
          error: function (error) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "error",
              title: "session expired",
            });
          },
        });
      });
    },
    error: function (error) {
      showErrorToast("Session expired");
    },
  });
}

function loadAllNormEmployees(branchId) {
  $.ajax({
    url: BASE_URL + "api/v1/employee/cashier",
    type: "GET",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      console.log(data);
      const employees = data.filter(
        (employee) => employee.branchId === branchId
      );
      employees.forEach((emp) => {
        $(`#emp-cashier-row-${branchId}`).append(createEmployeeCard(emp));
      });
      $(".btn-edit-employee").on("click", function () {
        let branchId = $(this).closest(".card");
        $("#btn-add-emp").html(
          '<i class="bi bi-person-fill-add"></i>Update Employee'
        );
        $("#emp-email").prop("disabled", true);
        employeeId = branchId.find(".emp-id").text();
        console.log(employeeId);

        $.ajax({
          url: BASE_URL + "api/v1/employee/" + employeeId,
          type: "GET",
          headers: {
            Authorization: "Bearer " + userdetail.jwt,
          },
          success: function (data) {
            $("#emp-name").val(data.empName);
            $("#emp-gender").val(data.gender);
            $("#emp-contact").val(data.contact);
            $("#emp-email").val(data.email);
            $("#emp-designation").val(data.designation);
            $("#emp-dob").val(data.dob);
            $("#emp-emg-guardian").val(data.emergencyInfo);
            $("#emp-emg-contact").val(data.emergencyContact);
            $("#emp-civil-status").val(data.status);
            $("#emp-branch").val(data.branchId);
            $("#emp-address-lane").val(data.address.lane);
            $("#emp-address-country").val(data.address.mainCountry);
            $("#emp-address-city").val(data.address.mainCity);
            $("#emp-address-state").val(data.address.mainState);
            $("#emp-address-code").val(data.address.postalCode);
            $("#emp-img-preview").attr(
              "src",
              "https://drive.google.com/thumbnail?id=" +
                data.profilePic +
                "&sz=w1000"
            );
            $("#employee-modal").modal("show");
          },
          error: function (error) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "error",
              title: "session expired",
            });
          },
        });
      });
    },
    error: function (error) {
      showErrorToast("Session expired");
    },
  });
}

function loadalladmin() {
  $.ajax({
    url: BASE_URL + "api/v1/employee/admin",
    type: "GET",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      console.log(data);
      const manager = data.find(
        (employee) => employee.email === userdetail.username
      );
      if (manager) {
        loadallUsers(manager.branchId);
      } else {
        showErrorToast("Manager details not found");
      }
    },
    error: function (error) {
      showErrorToast("Session expired");
    },
  });
}

function loadallUsers(branchId) {
  $.ajax({
    url: BASE_URL + "api/v1/employee/cashier",
    type: "GET",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      console.log(data);
      $(`#emp-info-row`).append(`
      <section
        class="row w-100 rounded border shadow-sm mt-3 d-flex flex-wrap ps-4 overflow-y-auto position-relative bg-dark-subtle"
        style="height: 490px"
        id="emp-branch-row"
      >
        <span class="fs-3 fw-bold text-dark">Branch Employees</span>
        <section class="row row-cols-md-2 mb-3 w-100 mt-3 d-flex justify-content-evenly" id="emp-cashier-row"></section>
      </section>
      `);
      data.forEach((emp) => {
        if (emp.branchId == branchId) {
          $(`#emp-cashier-row`).append(createEmployeeCard(emp));
        }
      });
      setEvent(); // Move the event binding outside of this function if necessary
    },
    error: function (error) {
      showErrorToast("Session expired");
    },
  });
}

function setEvent() {}
$("#employee-clear").on("click", function () {
  $("#emp-name").val("");
  $("#emp-gender").val("");
  $("#emp-emg-contact").val("");
  $("#emp-emg-guardian").val("");
  $("#emp-designation").val("");
  $("#emp-civil-status").val("");
  $("#emp-email").val("");
  $("#emp-contact").val("");
  $("#emp-designation").val("");
  $("#emp-dob").val("");
  $("#emp-branch").val("");
  $("#emp-address-lane").val("");
  $("#emp-address-country").val("");
  $("#emp-address-city").val("");
  $("#emp-address-state").val("");
  $("#emp-address-code").val("");
});
