const inventdtl = [];

function getSaleInventory(saleId) {
  $.ajax({
    url: BASE_URL + "api/v1/sale-inventory/" + saleId,
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    method: "GET",
    success: function (response) {
      console.log("Sale inventory", response);
      const items = response.inventoryDetails;
      console.log(items);
      let itemsHtml =
        `<form id="refund-inputs" class="p-3 h-100">` +
        `<div class="d-flex flex-column w-100 h-100 rounded border border-1 shadow-lg p-3">`;
      items.forEach(function (item) {
        let price = 0;
        let itmname = "";
        inventdtl.forEach(function (inventory) {
          if (item.inventory_id == inventory.itemCode) {
            itmname = inventory.itemDescription;
            price = parseFloat(
              inventory.sellingPrice -
                inventory.sellingPrice * (inventory.discount / 100)
            );
          }
        });

        itemsHtml +=
          `<div class="d-flex flex-row justify-content-evenly  item-data text-dark fw-bold" data-sale-id="${saleId}" data-item-code="${item.inventory_id}" data-qty="${item.qty}" data-price="${price}" data-deducted-qty="0">` +
          '<div class="d-flex justify-content-between gap-3 bg-body-tertiary rounded w-25 mb-2">' +
          "Item Name-" +
          itmname +
          "<br>Item Qty: " +
          item.qty +
          "</div>" +
          '<div class="d-flex justify-content-between gap-3 bg-body-tertiary rounded w-50 mb-2">' +
          '<button type="button" class="btn btn-dark w-25 rounded rounded-end-0 btn-sm btn-min-qty">-</button>' +
          '<small class="d-flex justify-content-center align-align-items-center  me-5 pe-5 text-dark mt-1 fw-bold txt-qty">' +
          item.qty +
          "</small>" +
          "</div></div>";
      });
      itemsHtml += "</form></div>";

      $("#refund-modal .modal-body").html(itemsHtml);
      $("#refund-modal").modal("show");

      $(".btn-min-qty").on("click", function () {
        const itemElement = $(this).closest(".d-flex.flex-row");
        let qty = parseInt(itemElement.attr("data-qty"));
        let deductedQty = parseInt(itemElement.attr("data-deducted-qty"));
        const price = parseFloat(itemElement.attr("data-price"));

        if (qty > 0) {
          qty--;
          deductedQty++;
          itemElement.attr("data-qty", qty);
          itemElement.attr("data-deducted-qty", deductedQty);
          itemElement.find(".txt-qty").text(qty);
        }
      });
    },
    error: function (xhr, status, error) {
      console.error("Error fetching sale inventory:", error);
      Swal.fire({
        title: "Error",
        text: "Error fetching sale inventory. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });
}

function updateItemQty(saleId, items) {
  let deductedSubTotal = 0;
  let deductedItemSoldCount = 0;

  const inventoryDTOlist = [];

  items.forEach(function (item) {
    const itemPrice = parseFloat(item.price);
    const deductedQty = parseInt(item.deductedQty);
    deductedSubTotal += itemPrice * deductedQty;

    inventoryDTO = {
      itemCode: item.inventory_id,
      itemSoldCount: deductedQty,
    };
    inventoryDTOlist.push(inventoryDTO);
  });

  const saleDTO = {
    saleId: saleId,
    subTotal: deductedSubTotal,
    itemsSoldCount: deductedItemSoldCount,
  };

  const saleInventoryDTO = {
    saleId: saleId,
    inventoryDetails: items.map((item) => ({
      inventory_id: item.inventory_id,
      qty: item.qty,
    })),
  };

  const data = {
    saleDTO: saleDTO,
    saleInventoryDTO: saleInventoryDTO,
    inventoryDTOList: inventoryDTOlist,
  };

  console.log(saleDTO);
  console.log(saleInventoryDTO);
  console.log(inventoryDTOlist);

  $.ajax({
    url: BASE_URL + "api/v1/sale/update",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function (response) {
      console.log("Successfully updated item quantity", response);
      Swal.fire({
        title: "Success",
        text: "Item quantities updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    error: function (xhr, status, error) {
      console.error("Error updating item quantity:", error);
      Swal.fire({
        title: "Error",
        text: "Error updating item quantities. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });
}

$("#save-qty-changes").on("click", function () {
  const saleId = $("#refund-inputs")
    .find(".item-data")
    .first()
    .attr("data-sale-id");
  let items = [];

  $("#refund-inputs .item-data").each(function () {
    const itemCode = $(this).attr("data-item-code");
    const qty = $(this).attr("data-qty");
    const price = $(this).attr("data-price");
    const deductedQty = $(this).attr("data-deducted-qty");
    items.push({
      inventory_id: itemCode,
      qty: qty,
      price: price,
      deductedQty: deductedQty,
    });
  });

  console.log(items);
  updateItemQty(saleId, items);
});

// function getallsales() {
//   $.ajax({
//     url: BASE_URL + "api/v1/sale",
//     headers: {
//       Authorization: "Bearer " + userdetail.jwt,
//     },
//     method: "GET",
//     success: function (res) {
//       if (Array.isArray(res)) {
//         const today = new Date();
//         const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;
//         let html = "";

//         res.forEach((element) => {
//           console.log(element);
//           getitems();
//           const purchaseDate = new Date(element.purchaseDate);
//           const timeDiff = today - purchaseDate;

//           if (timeDiff <= threeDaysInMilliseconds && element.subTotal > 0) {
//             html += `
//                 <tr style="font-size: 10px">
//                   <td class="text-center text-dark bg-light-subtle" style="width:80px;">${element.saleId}</td>
//                   <td class="text-center">${element.customerName}</td>
//                   <td class="text-center">${element.customerContact}</td>
//                   <td class="text-center">${element.purchaseDate}</td>
//                   <td class="text-center">${element.cashierName}</td>
//                   <td class="text-center">${element.subTotal}</td>
//                   <td class="d-flex">
//                     <button style="height: 35px" class="btn btn-sm btn-light btn-edit-refund" data-sale-id="${element.saleId}">
//                       <i class="bi bi-pen-fill"></i>Refund
//                     </button>
//                   </td>
//                 </tr>
//               `;
//           }
//         });
//         $("#tbl-refund-body").html(html);

//         // Add event listener for refund buttons
//         $(".btn-edit-refund").on("click", function () {
//           const saleId = $(this).data("sale-id");
//           getSaleInventory(saleId);
//         });
//       } else {
//         console.error("Unexpected response format:", res);
//       }
//     },
//     error: function (error) {
//       const Toast = Swal.mixin({
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.onmouseenter = Swal.stopTimer;
//           toast.onmouseleave = Swal.resumeTimer;
//         },
//       });
//       Toast.fire({
//         icon: "error",
//         title: "Session expired! Please login again.",
//       });
//     },
//   });
// }

// getallsales();

function getitems() {
  $.ajax({
    url: BASE_URL + "api/v1/inventory",
    method: "GET",
    async: true,
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      inventdtl.push(...data);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function getAllSales() {
  $.ajax({
    url: BASE_URL + "api/v1/sale",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    method: "GET",
    success: function (res) {
      if (Array.isArray(res)) {
        const today = new Date();
        const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;
        let html = "";

        res.forEach((element) => {
          console.log(element);
          getitems();
          const purchaseDate = new Date(element.purchaseDate);
          const timeDiff = today - purchaseDate;

          if (timeDiff <= threeDaysInMilliseconds && element.subTotal > 0) {
            html += `
                  <tr ">
                    <td class="text-center text-dark bg-light-subtle" style="width:80px;">${
                      element.saleId
                    }</td>
                    <td class="text-center">${element.customerName}</td>
                    <td class="text-center">${
                      element.customerContact ? element.customerContact : "-"
                    }</td>
                    <td class="text-center">${element.purchaseDate}</td>
                    <td class="text-center">${element.cashierName}</td>
                    <td class="text-center">${element.subTotal}</td>
                    <td class="d-flex">
                      <button style="height: 35px" class="btn btn-sm btn-light btn-edit-refund" data-sale-id="${
                        element.saleId
                      }">
                        <i class="bi bi-pen-fill"></i>Refund
                      </button>
                    </td>
                  </tr>
                `;
          }
        });
        $("#tbl-refund-body").html(html);

        // Add event listener for refund buttons
        $(".btn-edit-refund").on("click", function () {
          const saleId = $(this).data("sale-id");
          checkAdminPrivileges(saleId);
        });
      } else {
        console.error("Unexpected response format:", res);
      }
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

function checkAdminPrivileges(saleId) {
  if (userdetail.role === "SUPER_ADMIN" || userdetail.role === "ADMIN") {
    getSaleInventory(saleId);
  } else {
    $("#admin-password-modal").modal("show");

    $("#submit-admin-password").on("click", function () {
      const adminPassword = $("#admin-password").val();
      const adminmail = $("#admin-email").val();
      if (adminPassword) {
        verifyAdminPassword(adminPassword, adminmail, saleId);
      }
    });
  }
}

function verifyAdminPassword(password, mail, saleId) {
  var datauser = {
    username: mail,
    password: password,
  };

  $.ajax({
    url: BASE_URL + "api/auth/verification",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(datauser),
    success: function (res) {
      if (res) {
        $("#admin-password-modal").modal("hide");
        getSaleInventory(saleId);
      } else {
        Swal.fire({
          title: "Error",
          text: "Invalid admin password. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    error: function (error) {
      console.error("Error verifying admin password:", error);
      Swal.fire({
        title: "Error",
        text: "Error verifying admin password. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });
}

getAllSales();
