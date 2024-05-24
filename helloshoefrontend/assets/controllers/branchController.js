let branchID;

$("#btn-branch-modal").on("click", function () {
  $("#btn-add-branch").html(
    '<i class="bi bi-building-fill-add"></i>Add Branch'
  );
  $("#branch-modal").modal("show");
});

$("#btn-add-branch").on("click", function () {
  let branch = {
    branchId: branchID,
    branchName: $("#branch-name").val(),
    branchContact: $("#branch-contact").val(),
    address: {
      lane: $("#branch-address-lane").val(),
      mainCountry: $("#branch-address-country").val(),
      mainCity: $("#branch-address-city").val(),
      mainState: $("#branch-address-state").val(),
      postalCode: $("#branch-address-code").val(),
    },
  };
  if (
    $("#btn-add-branch").html() ===
    '<i class="bi bi-building-fill-add"></i>Add Branch'
  ) {
    $.ajax({
      url: BASE_URL + "api/v1/branch",
      headers: {
        Authorization: "Bearer " + userdetail.jwt,
      },
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(branch),
      success: function (res) {
        getAllBranches();
        clearInputFields();
        $("#branch-modal").modal("hide");
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
          title: res,
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
          title: "Something went wrong! Please try again.",
        });
      },
    });
  } else {
    $.ajax({
      url: BASE_URL + "api/v1/branch",
      headers: {
        Authorization: "Bearer " + userdetail.jwt,
      },
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(branch),
      success: function (res) {
        getAllBranches();
        $("#branch-modal").modal("hide");
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
          title: res,
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
          title: "Something went wrong! Please try again.",
        });
      },
    });
  }
});

function setEvent() {
  $("#tbl-branch").on("click", ".btn-edit-branch", function () {
    $("#btn-add-branch").html(
      '<i class="bi bi-building-fill-add"></i>Update Branch'
    );
    $("#branch-modal").modal("show");
    let branchId = $(this).closest("tr");
    branchID = branchId.find("td:eq(0)").text();
    $("#branch-name").val(branchId.find("td:eq(1)").text());
    $("#branch-contact").val(branchId.find("td:eq(2)").text());
    $("#branch-address-lane").val(
      branchId.find("td:eq(5)").text().split(",")[0]
    );
    $("#branch-address-country").val(
      branchId.find("td:eq(5)").text().split(",")[4]
    );
    $("#branch-address-city").val(
      branchId.find("td:eq(5)").text().split(",")[1]
    );
    $("#branch-address-state").val(
      branchId.find("td:eq(5)").text().split(",")[2]
    );
    $("#branch-address-code").val(
      branchId.find("td:eq(5)").text().split(",")[3]
    );
  });

  $("#tbl-branch").on("click", ".btn-branch-delete", function () {
    let branchId = $(this).closest("tr");
    let id = branchId.find("td:eq(0)").text();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: BASE_URL + "api/v1/branch/" + id,
          headers: {
            Authorization: "Bearer " + userdetail.jwt,
          },
          method: "DELETE",
          success: function (res) {
            console.log(res);
            getAllBranches();
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
              title: res,
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
              title: "Something went wrong! Please try again.",
            });
          },
        });
      }
    });
  });
}

function getAllBranches() {
  $.ajax({
    url: BASE_URL + "api/v1/branch",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    method: "GET",
    success: function (res) {
      console.log(res);
      let branches = res;
      let html = "";
      branches.forEach((branch) => {
        html += `
               <tr style="font-size: 10px">
               <td class="text-center text-dark bg-light-subtle" style="width:80px; ">${
                 branch.branchId
               }</td>
               <td class="text-center">${branch.branchName}</td>
               <td class="text-center">${branch.branchContact}</td>
               <td class="text-center">${
                 branch.branchManager === null
                   ? "not assign"
                   : branch.branchManager
               }</td>
                   <td class="text-center">${
                     branch.noOfEmployees === null
                       ? "not assign"
                       : branch.noOfEmployees
                   }</td>
                   <td class="text-center">${branch.address.lane}, ${
          branch.address.mainCity
        }, ${branch.address.mainState}, ${branch.address.postalCode},${
          branch.address.mainCountry
        }</td>
        <td class="text-center">${branch.createdDate}</td>
                   <td class="d-flex ">
                       <button style="height: 35px" class="btn btn-sm btn-light btn-edit-branch">
                       <i class="bi bi-pen-fill"></i>Edit
                       </button>
                       <button style="height: 35px" class="btn btn-sm btn-danger ms-2  btn-branch-delete">
                       <i class="bi bi-trash3-fill"></i>
                       </button>
                   </td>
               </tr>
                `;
      });
      setEvent();
      $("#tbl-branch-body").html(html);
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
        title: "Session expired! Please login again.",
      });
    },
  });
}

getAllBranches();
