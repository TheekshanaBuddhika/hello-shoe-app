let supplierId;

$("#btn-add-modal").on("click", function () {
  $("#btn-add-sup").html('<i class="bi bi-person-fill-add"></i>Add Supplier');
  $("#supplier-modal").modal("show");
});

$("#btn-add-sup").on("click", function () {
  const supplier = {
    supplierCode: supplierId,
    supplierName: $("#sup-name").val(),
    supplierCategory: $("#supplier-category").val(),
    contact: {
      mobile: $("#sup-contact-1").val(),
      land: $("#sup-contact-2").val(),
    },
    email: $("#sup-email").val(),
    address: {
      lane: $("#sup-address-lane").val(),
      mainCountry: $("#sup-address-country").val(),
      mainCity: $("#sup-address-city").val(),
      mainState: $("#sup-address-state").val(),
      postalCode: $("#sup-address-code").val(),
    },
    originCountry: $("#sup-origin-country").val(),
    isActive: true,
  };

  console.log(supplier);
  const requiredFields = [
    "supplierName",
    "supplierCategory",
    "contact.mobile",
    "email",
    "address.lane",
    "address.mainCountry",
    "address.mainCity",
    "address.mainState",
    "address.postalCode",
    "originCountry",
  ];

  for (const field of requiredFields) {
    const value = field
      .split(".")
      .reduce(
        (obj, key) => (obj && obj[key] !== undefined ? obj[key] : ""),
        supplier
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

  if (
    $("#btn-add-sup").html() ===
    '<i class="bi bi-person-fill-add"></i>Update Supplier'
  ) {
    $.ajax({
      type: "PUT",
      url: BASE_URL + "api/v1/suppliers",
      headers: {
        Authorization: "Bearer " + userdetail.jwt,
      },
      contentType: "application/json",
      data: JSON.stringify(supplier),
      success: function (data) {
        $("#supplier-modal").modal("hide");
        loadSuppliers();
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
          title: "Supplier not updated !",
        });
      },
    });
  } else {
    $.ajax({
      type: "POST",
      url: BASE_URL + "api/v1/suppliers",
      headers: {
        Authorization: "Bearer " + userdetail.jwt,
      },
      contentType: "application/json",
      data: JSON.stringify(supplier),
      success: function (data) {
        $("#supplier-modal").modal("hide");
        loadSuppliers();
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
          title: "Supplier not added !",
        });
      },
    });
  }
});

// function loadSuppliers() {
//   $.ajax({
//     type: "GET",
//     url: BASE_URL + "api/v1/suppliers",
//     headers: {
//       Authorization: "Bearer " + userdetail.jwt,
//     },
//     success: function (data) {
//       console.log(data);
//       let supplier = data;
//       let html = "";
//       supplier.forEach((supplier) => {
//         html += `
//                <tr>
//                    <td class="text-center">${supplier.supplierCode}</td>
//                    <td class="text-center">${supplier.supplierName}</td>
//                    <td class="text-center">${supplier.supplierCategory}</td>
//                    <td class="text-center">${supplier.contact.land}</td>
//                    <td class="text-center">${supplier.contact.mobile}</td>
//                    <td class="text-center">${supplier.email}</td>
//                    <td class="text-center"> ${supplier.address.lane} , ${supplier.address.mainCity},${supplier.address.mainState},${supplier.address.mainCountry},${supplier.address.postalCode}</td>
//                       <td class="text-center">
//                           <div class="d-flex">
//                           <button class="btn btn-sm btn-primary btn-supplier-edit"><i class="bi bi-pencil-square"></i></button>
//                           <button class="btn btn-sm btn-danger ms-2 btn-supplier-delete"><i class="bi bi-person-x-fill"></i></button>
//                           </div>
//                       </td>
//               </tr>
//                 `;
//       });
//       $("#tbl-supplier-body").html(html);
//       initializeTable();
//       $(".btn-supplier-edit").on("click", function () {
//         $("#btn-add-sup").text("Update Supplier");
//         let id = $(this).closest("tr").find("td:first-child").text();
//         supplierId = id;
//         renderSupplier(supplierId);
//         $("#supplier-modal").modal("show");
//       });

//       $(".btn-supplier-delete").on("click", function () {
//         let id = $(this).closest("tr").find("td:first-child").text();
//         Swal.fire({
//           title: "Are you sure?",
//           text: "You won't be able to revert this!",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonColor: "#3085d6",
//           cancelButtonColor: "#d33",
//           confirmButtonText: "Yes, delete it!",
//         }).then((result) => {
//           if (result.isConfirmed) {
//             deleteSupplier(id);
//           }
//         });
//       });
//     },
//     error: function (error) {
//       console.log(error);
//     },
//   });
// }

function loadSuppliers() {
  $.ajax({
    type: "GET",
    url: BASE_URL + "api/v1/suppliers",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      console.log(data);

      const html = data
        .map(
          (supplier) => `
        <tr style="font-size:10px">
          <td class="text-center text-dark bg-light-subtle" style="width:80px; ">${supplier.supplierCode}</td>
          <td class="text-center">${supplier.supplierName}</td>
          <td class="text-center">${supplier.contact.land}</td>
          <td class="text-center">${supplier.contact.mobile}</td>
          <td class="text-center">${supplier.email}</td>
          <td class="text-center">${supplier.supplierCategory}</td>
          <td class="text-center">${supplier.address.lane},${supplier.address.mainCity}</td>
          <td class="text-center">${supplier.address.mainState}</td>
          <td class="text-center">${supplier.address.postalCode}</td>
          <td class="text-center">${supplier.originCountry}</td>
          <td class="text-center">
            <div class="d-flex">
              <button class="btn btn-sm btn-light btn-supplier-edit"><i class="bi bi-pen-fill"></i>Edit</button>
              <button class="btn btn-sm btn-danger ms-2 btn-supplier-delete"><i class="bi bi-trash3-fill"></i></button>
            </div>
          </td>
        </tr>
      `
        )
        .join("");

      const $supplierTableBody = $("#tbl-supplier-body");
      $supplierTableBody.html(html);

      bindSupplierEvents(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function bindSupplierEvents(suppliers) {
  $(".btn-supplier-edit").on("click", function () {
    $("#btn-add-sup").html(
      '<i class="bi bi-person-fill-add"></i>Update Supplier'
    );
    const id = $(this).closest("tr").find("td:first-child").text();
    supplierId = id;
    renderSupplier(supplierId);
    $("#supplier-modal").modal("show");
  });

  $(".btn-supplier-delete").on("click", function () {
    const id = $(this).closest("tr").find("td:first-child").text();
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
        deleteSupplier(id);
      }
    });
  });
}

loadSuppliers();

function deleteSupplier(id) {
  $.ajax({
    type: "DELETE",
    url: BASE_URL + "api/v1/suppliers/delete/" + id,
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
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
        title: "Supplier deleted !",
      });
      loadSuppliers();
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

function renderSupplier(id) {
  $.ajax({
    type: "GET",
    url: BASE_URL + "api/v1/suppliers/" + id,
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      $("#sup-name").val(data.supplierName);
      $("#supplier-category").val(data.supplierCategory);
      $("#sup-contact-1").val(data.contact.mobile);
      $("#sup-contact-2").val(data.contact.land);
      $("#sup-email").val(data.email);
      $("#sup-address-lane").val(data.address.lane);
      $("#sup-address-country").val(data.address.mainCountry);
      $("#sup-address-city").val(data.address.mainCity);
      $("#sup-address-state").val(data.address.mainState);
      $("#sup-address-code").val(data.address.postalCode);
      $("#sup-origin-country").val(data.originCountry);
    },
    error: function (error) {
      alert("Supplier not found !");
    },
  });
}

$("#supplier-clear").on("click", function () {
  $("#sup-name").val("");
  $("#supplier-category").val("");
  $("#sup-contact-1").val("");
  $("#sup-contact-2").val("");
  $("#sup-email").val("");
  $("#sup-address-lane").val("");
  $("#sup-address-country").val("");
  $("#sup-address-city").val("");
  $("#sup-address-state").val("");
  $("#sup-address-code").val("");
  $("#sup-origin-country").val("");
});

function loadSuppliersForRegeular() {
  $.ajax({
    type: "GET",
    url: BASE_URL + "api/v1/suppliers",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      console.log(data);
      let supplier = data;
      let html = "";
      supplier.forEach((supplier) => {
        html += `
               <tr style="font-size:10px">
                    <td class="text-center text-dark bg-light-subtle" style="width:80px; ">${supplier.supplierCode}</td>
                   <td class="text-center">${supplier.supplierName}</td>
                  <td class="text-center">${supplier.contact.land}</td>
                  <td class="text-center">${supplier.contact.mobile}</td>
                  <td class="text-center">${supplier.email}</td>
                  <td class="text-center">${supplier.supplierCategory}</td>
                  <td class="text-center">${supplier.address.lane},${supplier.address.mainCity}</td>
                  <td class="text-center">${supplier.address.mainState}</td>
                  <td class="text-center">${supplier.address.postalCode}</td>
                  <td class="text-center">${supplier.originCountry}</td>
              </tr>
                `;
      });
      $("#tbl-supplier-regeular-body").html(html);
      new DataTable("#tbl-supplier-regeular");
    },
    error: function (error) {
      console.log(error);
    },
  });
}

loadSuppliersForRegeular();
