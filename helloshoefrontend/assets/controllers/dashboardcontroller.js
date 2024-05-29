const userdetail = JSON.parse(localStorage.getItem("user"));

let itemidarray = [];

loadsalecarddata();

loaditemarddata();

function loadsalecarddata() {
  $.ajax({
    url: BASE_URL + "api/v1/sale",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    method: "GET",
    success: function (res) {
      if (Array.isArray(res)) {
        let salecount = 0;

        res.forEach((sale) => {
          salecount += 1;
        });

        $("#txttotalsale").text(` ${salecount}`);
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
function loaditemarddata() {
  $.ajax({
    url: BASE_URL + "api/v1/inventory",
    method: "GET",
    async: true,
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      let totalCost = 0;
      let totalItemsSold = 0;

      data.forEach((item) => {
        const itemidobj = {
          itemcode: item.itemCode,
          itemPicture: item.itemPicture,
        };
        itemidarray.push(itemidobj);
        totalCost += item.buyingPrice * item.getStockTotal;

        totalItemsSold += item.itemSoldCount;
      });

      $("#txttotalcosts").text(`Rs. ${totalCost}`);
      $("#txttotalproducts").text(totalItemsSold);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function loadallsales() {
  $.ajax({
    url: BASE_URL + "api/v1/sale-inventory",
    method: "GET",
    async: true,
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    success: function (data) {
      // Create an object to store item IDs and their quantities
      let itemQuantities = {};

      // Iterate through the data to count item quantities
      data.forEach(function (item) {
        let itemId = item.inventoryId;
        let itemQty = item.qty;

        if (itemQuantities[itemId]) {
          itemQuantities[itemId] += itemQty;
        } else {
          itemQuantities[itemId] = itemQty;
        }
      });

      // Find the item with the highest quantity
      let mostSoldItemId = null;
      let highestQuantity = 0;

      for (let itemId in itemQuantities) {
        if (itemQuantities[itemId] > highestQuantity) {
          highestQuantity = itemQuantities[itemId];
          mostSoldItemId = itemId;
        }
      }
      console.log(itemidarray);
      itemidarray.forEach(function (item, i) {
        if (mostSoldItemId == item.itemcode) {
          $("#bestseller").attr(
            "src",
            `https://drive.google.com/thumbnail?id=${item.itemPicture}&sz=w1000`
          );
        }
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

loadallsales();
