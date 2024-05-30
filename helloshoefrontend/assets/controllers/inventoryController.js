let itemCode;

$("#btn-open-model").on("click", function () {
  itemCode = null;
  $("#btn-add-item").html('<i class="bi bi-house-add-fill"></i> Add Product');
  $("#inventory-modal").modal("show");
});

$("#item-img").on("change", function () {
  var reader = new FileReader();
  reader.onload = function (e) {
    $("#item-img-preview").attr("src", e.target.result);
  };
  reader.readAsDataURL(this.files[0]);
});

let itemSoldCount = 0;

$("#btn-add-item").on("click", function () {
  let formData = new FormData();

  const item = {
    itemCode: itemCode,
    supplierId: $("#item-supplier").val(),
    itemDescription: $("#item-desc").val(),
    itemSoldCount: itemSoldCount,
    brand: $("#item-brand").val(),
    qtyOnHand: $("#item-qty").val(),
    size: $("#item-size").val(),
    buyingPrice: $("#item-buying-price").val(),
    sellingPrice: $("#item-selling-price").val(),
    expectedProfit: $("#item-expect-profit").val(),
    profitMargin: $("#profit-margin").val(),
    itemStatus: $("#item-status").val(),
    discount: $("#item-discount").val(),
    itemType: $("#item-userbility").val(),
    itemGender: $("#item-gender").val(),
  };

  for (const [key, value] of Object.entries(item)) {
    if (
      key !== "itemCode" &&
      key !== "itemSoldCount" &&
      (!value || value.trim() === "")
    ) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: `Please complete the ${key
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()} field.`,
        showConfirmButton: true,
      });
      return;
    }
  }

  formData.append("item", JSON.stringify(item));
  console.log(item);

  if (
    $("#btn-add-item").html() ===
    '<i class="bi bi-house-add-fill"></i> Update Product'
  ) {
    if ($("#item-img")[0].files.length === 0) {
      formData.append("itemImage", new File([""], "notUpdate"));
    } else {
      formData.append("itemImage", $("#item-img")[0].files[0]);
    }

    Swal.fire({
      title: "Updating...",
      text: "Please wait while we update the product.",
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        Swal.hideLoading();
      },
    });

    $.ajax({
      type: "PUT",
      url: BASE_URL + "api/v1/inventory",
      headers: {
        Authorization: "Bearer " + userdetail.jwt,
      },
      contentType: false,
      processData: false,
      data: formData,
      success: function (data) {
        Swal.close();
        $("#inventory-modal").modal("hide");
        loadItems();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: data,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
          toast: true,
        });
      },
      error: function (error) {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Item not updated!",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
          toast: true,
        });
      },
    });
  } else {
    formData.append("itemImage", $("#item-img")[0].files[0]);

    Swal.fire({
      title: "Saving...",
      text: "Please wait while we save the product.",
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        Swal.hideLoading();
      },
    });

    $.ajax({
      type: "POST",
      url: BASE_URL + "api/v1/inventory",
      headers: {
        Authorization: "Bearer " + userdetail.jwt,
      },
      contentType: false,
      processData: false,
      data: formData,
      success: function (data) {
        Swal.close();
        $("#inventory-modal").modal("hide");
        loadItems();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: data,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
          toast: true,
        });
      },
      error: function (error) {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Item not added!",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
          toast: true,
        });
      },
    });
  }
});

function loadAllSupplierId() {
  $.ajax({
    url: BASE_URL + "api/v1/suppliers/get/id",
    method: "GET",
    async: true,
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      data.forEach(function (supplier) {
        $("#item-supplier").append(
          '<option value="' + supplier + '">' + supplier + "</option>"
        );
      });
    },
    error: function (error) {
      // swal("Error", "Failed to load supplier id", "error");
    },
  });
}

function loadItems() {
  $.ajax({
    url: BASE_URL + "api/v1/inventory",
    method: "GET",
    async: true,
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      console.log(data);
      let items = data;
      let status;
      let html = "";
      items.forEach((item) => {
        if (item.itemStatus === "AVAILABLE") {
          status = `<span class="badge bg-success-subtle text-success">${item.itemStatus}</span>`;
        } else if (item.itemStatus === "LOW_STOCK") {
          status = `<span class="badge bg-warning-subtle text-warning">${item.itemStatus}</span>`;
        } else {
          status = `<span class="badge bg-danger-subtle text-danger">${item.itemStatus}</span>`;
        }

        html += `
                      <tr>
                        <td class="text-center text-dark bg-light-subtle fw-bold" style="width:200px; ">${item.itemCode}</td>
                        <td class="text-center d-flex justify-content-center align-items-center "><img src="https://drive.google.com/thumbnail?id=${item.itemPicture}&sz=w1000" alt="no one" class="h-100 w-75 border border-dark-subtle  rounded" style=""></td>
                        <td class="text-center">${item.itemDescription}</td>
                        <td class="text-center">${item.size}</td>
                        <td class="text-center">${item.qtyOnHand}</td>
                        <td class="text-center">${item.brand}</td>
                        <td class="text-center">${item.itemType}</td>
                        <td class="text-center">${item.itemGender}</td>
                        <td class="text-center">${item.supplier.supplierCode}</td>
                        <td class="text-center">${item.supplier.supplierName}</td>
                        <td class="text-center">${item.discount}%</td>              
                        <td class="text-center">${item.sellingPrice}</td>
                        <td class="text-center">${item.buyingPrice}</td>
                        <td class="text-center">${item.expectedProfit}</td>
                        <td class="text-center">${item.profitMargin}</td>
                        <td class="text-center">${status}</td>
                        <td class="text-center text-white">
                            <button class="btn btn-sm btn-light btn-edit-item"><i class="bi bi-pen-fill"></i> Edit</button>
                        </td>
                    </tr>
                `;
      });
      $("#tbl-item-body").html(html);
      setEvents();
      // initializeTable();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

loadItems();

loadAllSupplierId();

$("#item-supplier").on("change", function () {
  let supid = $(this).val();
  if (supid == "") {
    $("#suppliersinvent-name").val("");
    return;
  }
  $.ajax({
    type: "GET",
    url: BASE_URL + "api/v1/suppliers",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      console.log(data);
      data.forEach(function (sup) {
        if (sup.supplierCode === supid) {
          console.log(sup);
          $("#suppliersinvent-name").val(sup.supplierName);
        }
      });
    },
    error: function (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Supplier not found! Please check the ID and try again.",
        icon: "error",
      });
    },
  });
});

function setEvents() {
  $(".btn-edit-item").on("click", function () {
    $("#btn-add-item").html(
      '<i class="bi bi-house-add-fill"></i> Update Product'
    );
    itemCode = $(this).closest("tr").find("td:eq(0)").text();
    renderItem(itemCode);
    $("#inventory-modal").modal("show");
  });
}

function renderItem(id) {
  $.ajax({
    type: "GET",
    url: BASE_URL + "api/v1/inventory/" + id,
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      $("#item-supplier").val(data.supplierId);
      $("#item-desc").val(data.itemDescription);
      itemSoldCount = data.itemSoldCount;
      $("#item-brand").val(data.brand);
      $("#item-qty").val(data.qtyOnHand);
      $("#item-size").val(data.size);
      $("#item-buying-price").val(data.buyingPrice);
      $("#item-selling-price").val(data.sellingPrice);
      $("#item-expect-profit").val(data.expectedProfit);
      $("#profit-margin").val(data.profitMargin);
      $("#item-status").val(data.itemStatus);
      $("#item-discount").val(data.discount);
      $("#item-userbility").val(data.itemType);
      $("#item-supplier").val(data.supplier.supplierCode);
      $("#suppliersinvent-name").val(data.supplier.supplierName);
      $("#item-gender").val(data.itemGender);
      $("#item-img-preview").attr(
        "src",
        "https://drive.google.com/thumbnail?id=" +
          data.itemPicture +
          "&sz=w1000"
      );
    },
    error: function (error) {
      alert("Item not found !");
    },
  });
}

$("#inventory-clear").on("click", function () {
  $(`#item-img-preview`).attr("src", `assets/images/login/shoe_shop_logo.png`);
  $("#item-img").val("");
  $("#item-supplier").val("");
  $("#item-desc").val("");
  $("#item-brand").val("");
  $("#item-qty").val("");
  $("#item-size").val("");
  $("#item-buying-price").val("");
  $("#item-selling-price").val("");
  $("#item-expect-profit").val("");
  $("#profit-margin").val("");
  $("#item-status").val("");
  $("#item-discount").val("");
  $("#item-userbility").val("");
  $("#item-supplier").val("");
  $("#suppliersinvent-name").val("");
  $("#item-gender").val("");
});

$("#item-discount").on("input", function (e) {
  if (this.value < 0) {
    this.value = 0;
  }
});

$("#item-size").on("input", function (e) {
  if (this.value < 0) {
    this.value = 0;
  }
});

function loadselectBrands() {
  $.ajax({
    url: BASE_URL + "api/v1/inventory/get/brands",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    type: "GET",
    success: function (data) {
      data.forEach(function (brand) {
        $("#item-brand").append(
          '<option value="' + brand + '">' + brand + "</option>"
        );
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

loadselectBrands();

function validateInputField(selector) {
  $(selector)
    .on("input", function () {
      let value = $(this).val();
      if (value < 0) {
        $(this).val(0);
        Swal.fire({
          title: "Invalid Input",
          text: "Value cannot be a negative number.",
          icon: "warning",
        });
      }
    })
    .on("keypress", function (e) {
      if (e.which < 48 || e.which > 57) {
        e.preventDefault();
        Swal.fire({
          title: "Invalid Input",
          text: "Only numbers are allowed.",
          icon: "warning",
        });
      }
    });
}

const fields = [
  "#item-qty",
  "#item-buying-price",
  "#item-selling-price",
  "#item-expect-profit",
  "#profit-margin",
];
fields.forEach(function (field) {
  validateInputField(field);
});
