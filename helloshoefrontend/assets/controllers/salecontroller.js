let productList;

let cart = [];

let subTotal = 0;

let paymentMethod = "CASH";

let isDemoUser = true;

function loadBrands() {
  $.ajax({
    url: BASE_URL + "api/v1/inventory/get/brands",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    type: "GET",
    success: function (response) {
      let brandList = ["All", ...response];
      $("#brand-list").empty();
      for (const brand of brandList) {
        if (brand === "All") {
          $("#brand-list").append(`
        <li class="nav-item p-1" style="min-width: fit-content;" role="presentation">
            <button class="nav-link active w-100 bg-dark-subtle text-dark fw-bold shadow-sm" id="pills-home-tab" 
            data-bs-toggle="pill" data-bs-target="#pills-home"  type="button" role="tab" aria-controls="pills-home" style="white-space: nowrap;">${brand}
            </button>
        </li>
    `);
          continue;
        }

        $("#brand-list").append(`
        <li class="nav-item p-1" style="min-width: fit-content;" role="presentation">
            <button class="nav-link w-100 bg-dark-subtle text-dark fw-bold shadow-sm" id="pills-home-tab" data-bs-toggle="pill"
            data-bs-target="#pills-home" type="button"role="tab" aria-controls="pills-home" style="white-space: nowrap;">${brand}
            </button>
        </li>
    `);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

loadBrands();

function loadProducts() {
  $("#product-content").empty();
  $.ajax({
    url: BASE_URL + "api/v1/inventory/available",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    type: "GET",
    success: function (response) {
      productList = response;
      let productsHtml = response
        .map(
          (product) => `
        <div class="col-4 z-1 h-100">
            <div class="card h-100 w-100 d-flex flex-column p-1 m-1 shadow-sm">
            <div class="d-flex flex-row h-75 w-100 bg-body-secondary rounded mb-1 ">
            <img src="https://drive.google.com/thumbnail?id=${product.itemPicture}&sz=w1000"  class="card-img-top rounded  w-25" alt="...">
            <div class="card-body p-1">
                <div class="d-flex flex-column justify-content-center text-center fs-4 fw-bold text-capitalize"
                style="font-family:monospace;">
                ${product.itemDescription}
                <small class="fs-6 fw-semibold align-self-center">  ${product.itemCode}</small>
                </div>

                <div class="d-flex justify-content-sm-between">
                <small class="text-dark fs-6">Size:</small>
                <small> ${product.size}</small>
                <small class="text-primary">Remaning :</small>
                <small class="text-primary">${product.qtyOnHand}</small>  
            </div>
        
                <div class="d-flex justify-content-sm-between">
                <small class="text-danger">Discount :</small>
                <small class="text-danger">${product.discount}%</small>
            </div>
              
         
               
            </div>
            </div>
            <div class="d-flex flex-row w-100 h-25 justify-content-between align-items-center">
            <h5 class="card-title  text-center text-dark fw-bold fs-5">Rs. ${product.sellingPrice}</h5>
            <button class="btn btn-outline-dark h-100 w-50 btn-add-cart"><i class="bi bi-cart-plus"></i></button>
            </div>
              
            </div>
        </div>`
        )
        .join("");

      $("#product-content").html(productsHtml);

      $(".btn-add-cart")
        .off("click")
        .on("click", function () {
          let index = $(this).closest(".col-4").index();
          let product = productList[index];
          if (!cart.find((p) => p.itemCode === product.itemCode)) {
            subTotal +=
              product.sellingPrice -
              (product.sellingPrice * product.discount) / 100;
            $("#txt-sub-total").text("Rs. " + subTotal);
            let point = Math.ceil(subTotal / 800);
            $("#added-new-point").text(point);
            product.getqty = 1;
            cart.push(product);
          }
          renderCart();
        });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function renderCart() {
  const cartHtml = cart
    .map(
      (product, index) => `
    <div class="border mt-1 rounded cart-item p-1 bg-white shadow-sm" data-index="${index}">
      <div class="d-flex rounded rounded-bottom-0 bg-white overflow-hidden p-1">
        <img src="https://drive.google.com/thumbnail?id=${product.itemPicture}&sz=w1000" class="w-25 rounded ">
        <div class="d-flex justify-content-center align-items-start flex-column ms-3 w-75 position-relative">
          <button class="btn btn-outline-danger btn-sm btn-remove-cart-item align-self-end d-flex justify-content-center align-items-center" style="width:15%; height:50%"><i class="bi bi-dash"></i></button>
          <small class="text-dark fs-5 fw-bold position-absolute" style="monospace">${product.itemCode}</small>
          <small class="text-dark mt-4">Size: ${product.size}</small>
        </div>
      </div>
      <div class="d-flex justify-content-sm-between rounded bg-dark-subtle rounded-top-0 p-1">
     
        <small class="text-dark fw-bold fs-6">Rs. ${product.sellingPrice}</small>
        <div class="d-flex justify-content-between gap-3 bg-body-tertiary rounded">
          <button class="btn btn-dark w-25 rounded rounded-end-0 btn-sm btn-decrease-qty">-</button>
          <small class="text-dark mt-1 fw-bold txt-qty">${product.getqty}</small>
          <button class="btn btn-dark w-25 rounded rounded-start-0 btn-sm btn-increase-qty d-flex justify-content-center align-items-center">+</button>
        </div>
      </div>
    </div>`
    )
    .join("");

  $("#cart").html(cartHtml);
  setCartEvents();
}

function setCartEvents() {
  $(".btn-remove-cart-item").on("click", function () {
    let index = $(this).closest(".cart-item").data("index");
    let product = cart[index];
    subTotal -=
      product.sellingPrice - (product.sellingPrice * product.discount) / 100;
    $("#txt-sub-total").text("Rs. " + subTotal);
    $("#balance-amount").val(subTotal);
    let point = Math.ceil(subTotal / 800);
    $("#added-new-point").text(point);
    cart.splice(index, 1);
    renderCart();
  });

  $(".btn-decrease-qty, .btn-increase-qty").on("click", function () {
    let index = $(this).closest(".cart-item").data("index");
    let product = cart[index];
    let qty = product.getqty;
    if ($(this).hasClass("btn-increase-qty")) {
      if (qty < product.qtyOnHand) {
        qty++;
        updateQuantity(product, qty);
      }
    } else if (qty > 1) {
      qty--;
      updateQuantity(product, qty);
    }
  });
}

function updateQuantity(product, qty) {
  product.getqty = qty;
  renderCart();
  subTotal = cart.reduce(
    (total, p) =>
      total + (p.sellingPrice - (p.sellingPrice * p.discount) / 100) * p.getqty,
    0
  );
  $("#txt-sub-total").text("Rs. " + subTotal);
  let point = Math.ceil(subTotal / 800);
  $("#added-new-point").text(point);
}

loadProducts();

$("#brand-list").on("click", "button", function () {
  $(this).addClass("active").siblings().removeClass("active");
  let brand = $(this).text();
  if (brand.trim() === "All") {
    loadProducts();
  } else {
    renderProductForBrand(brand);
  }
});

function renderProductForBrand(brand) {
  $.ajax({
    url: BASE_URL + "api/v1/inventory/available/" + brand,
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    type: "GET",
    success: function (response) {
      productList = response;
      $("#product-content").empty();
      for (const product of response) {
        $("#product-content").append(`
        <div class="col-4 z-1 h-100">
        <div class="card h-100 w-100 d-flex flex-column p-1 m-1 shadow-sm">
        <div class="d-flex flex-row h-75 w-100 bg-body-secondary rounded mb-1 ">
        <img src="https://drive.google.com/thumbnail?id=${product.itemPicture}&sz=w1000"  class="card-img-top rounded  w-25" alt="...">
        <div class="card-body p-1">
                <div class="d-flex flex-column justify-content-center text-center fs-4 fw-bold text-capitalize"
                style="font-family:monospace;">
                ${product.itemDescription}
                <small class="fs-6 fw-semibold align-self-center">  ${product.itemCode}</small>
                </div>

            <div class="d-flex justify-content-sm-between">
            <small class="text-dark fs-6">Size:</small>
            <small> ${product.size}</small>
            <small class="text-primary">Remaning :</small>
            <small class="text-primary">${product.qtyOnHand}</small>  
        </div>
    
            <div class="d-flex justify-content-sm-between">
            <small class="text-danger">Discount :</small>
            <small class="text-danger">${product.discount}%</small>
        </div>
          
     
           
        </div>
        </div>
        <div class="d-flex flex-row w-100 h-25 justify-content-between align-items-center">
        <h5 class="card-title  text-center text-dark fw-bold fs-5">Rs. ${product.sellingPrice}</h5>
        <button class="btn btn-outline-dark h-100 w-50 btn-add-cart"><i class="bi bi-cart-plus"></i></button>
        </div>
          
        </div>
    </div>`);
      }
      $(".btn-add-cart")
        .off("click")
        .on("click", function () {
          console.log("Add to cart button clicked");
          let index = $(this).closest(".col-4").index();
          console.log("Product index:", index);
          let product = productList[index];
          console.log("Selected product:", product);
          if (!cart.find((p) => p.itemCode === product.itemCode)) {
            subTotal +=
              product.sellingPrice -
              (product.sellingPrice * product.discount) / 100;
            $("#txt-sub-total").text("Rs. " + subTotal + " /=");
            let point = Math.ceil(subTotal / 800);
            $("#added-new-point").text(point + "");
            product.getqty = 1;
            cart.push(product);
          }
          renderCart();
          console.log(cart);
        });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

$("#btn-move-right").on("click", function () {
  $("#brand-list").animate(
    {
      scrollLeft: "+=50px",
    },
    500,
    "linear"
  );
});

$("#btn-move-left").on("click", function () {
  $("#brand-list").animate(
    {
      scrollLeft: "-=50px",
    },
    500,
    "linear"
  );
});

$("#btn-clear").on("click", function () {
  isDemoUser = true;
  cart = [];
  subTotal = 0;
  $("#cart").empty();
  $("#txt-sub-total").text("Rs. 0");
  $("#txt-point").text("0");
  $("#txt-cus-contact").val("");
  $("#txt-cash").val("");
  $("#txt-customer-name").text("");
  if (paymentMethod == "CARD") {
    $("#payment-method-checkbox").click();
  }
  $("#txt-cus-contact").css({
    "border-color": "gray",
  });
  $("#loyal-name, #loyal-points, #loyal-current").css("display", "none");
  $("#balance-amount").val(0);
});

$("#txt-search-product").on("keyup", function () {
  let search = $(this).val();
  let filtered = productList.filter(
    (p) =>
      p.itemCode.toLowerCase().includes(search.toLowerCase()) ||
      p.itemDescription.toLowerCase().includes(search.toLowerCase())
  );
  $("#product-content").empty();
  for (const product of filtered) {
    $("#product-content").append(`
    <div class="col-4 z-1 h-100">
    <div class="card h-100 w-100 d-flex flex-column p-1 m-1 shadow-sm">
    <div class="d-flex flex-row h-75 w-100 bg-body-secondary rounded mb-1 ">
    <img src="https://drive.google.com/thumbnail?id=${product.itemPicture}&sz=w1000"  class="card-img-top rounded  w-25" alt="...">
    <div class="card-body p-1">
    <div class="d-flex flex-column justify-content-center text-center fs-4 fw-bold text-capitalize"
    style="font-family:monospace;">
    ${product.itemDescription}
    <small class="fs-6 fw-semibold align-self-center">  ${product.itemCode}</small>
    </div>

        <div class="d-flex justify-content-sm-between">
        <small class="text-dark fs-6">Size:</small>
        <small> ${product.size}</small>
        <small class="text-primary">Remaning :</small>
        <small class="text-primary">${product.qtyOnHand}</small>
    </div>

        <div class="d-flex justify-content-sm-between">
        <small class="text-danger">Discount :</small>
        <small class="text-danger">${product.discount}%</small>
    </div>

    </div>
    </div>
    <div class="d-flex flex-row w-100 h-25 justify-content-between align-items-center">
    <h5 class="card-title  text-center text-dark fw-bold fs-5">Rs. ${product.sellingPrice}</h5>
    <button class="btn btn-outline-dark h-100 w-50 btn-add-cart"><i class="bi bi-cart-plus"></i></button>
    </div>

    </div>
</div>`);
  }
});

function setCustomerContacts() {
  $.ajax({
    url: BASE_URL + "api/v1/customers/contact-list",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    type: "GET",
    success: function (response) {
      console.log(response);
      for (const contact of response) {
        $("#list-customerList").append(`
                    <option value=${contact}></option>
                `);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

setCustomerContacts();

$("#loyal-name, #loyal-points, #loyal-current").css("display", "none");

$("#txt-cus-contact").on("keypress", function (e) {
  let contact = $(this).val();
  if (e.keyCode === 13) {
    $.ajax({
      url: BASE_URL + "api/v1/customers/get/contact/" + contact,
      headers: {
        Authorization: "Bearer " + userdetail.jwt,
      },
      type: "GET",
      success: function (response) {
        isDemoUser = false;
        $("#loyal-name, #loyal-points, #loyal-current").css("display", "flex");
        console.log(response);
        $("#txt-customer-name").text(response.customerName);
        $("#txt-point").text(
          response.totalPoints === null ? 0 : response.totalPoints
        );
        $("#txt-cus-contact").css({
          "border-color": "green",
        });
      },
      error: function (error) {
        $("#txt-cus-contact").css({
          "border-color": "red",
        });
      },
    });
  }
});

$("#txt-cash").on("input", function () {
  let cashValue = $(this)
    .val()
    .replace(/[^0-9]/g, "");
  $(this).val(cashValue);

  let totalText = $("#txt-sub-total").text();
  let total = parseInt(totalText.replace(/[^0-9]/g, "")) || 0;

  if (total == 0) {
    return;
  }

  $("#balance-amount").val(total - $(this).val());
});

$("#btn-proceed-order").on("click", function () {
  let contact = $("#txt-cus-contact").val();
  let customerName = $("#txt-customer-name").text();
  let point = $("#added-new-point").text();
  let demoCusName = "Customer";
  let txtCash = $("#txt-cash").val();
  let balance = $("#balance-amount").val();

  if (paymentMethod === "CASH") {
    if (cart.length === 0 || subTotal === 0 || subTotal < parseFloat(txtCash)) {
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
        icon: "warning",
        title: "Cart is empty!",
      });
      return;
    }

    let order = {
      customerContact: contact,
      customerName: isDemoUser === true ? demoCusName : customerName,
      subTotal: subTotal,
      addedPoints: point,
      inventories: cart,
      cashierName: userdetail.username,
      paymentMethod: paymentMethod,
      isDemo: isDemoUser,
      getqty: cart.length,
    };
    console.log(order);
    $.ajax({
      url: BASE_URL + "api/v1/sale",
      headers: {
        Authorization: "Bearer " + userdetail.jwt,
      },
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(order),
      success: function (response) {
        $("div.spanner").removeClass("show");
        $("div.overlay").removeClass("show");
        console.log(response);
        $("#btn-clear").click();
        $("#txt-cus-contact").val("");
        $("#txt-customer-name").text("");
        $("#txt-cus-contact").css({
          "border-color": "gray",
        });
        $("#txt-demo-name").val("");
        $("#added-new-point").text("");

        Swal.fire({
          title: "Payment Successful",
          text: "payment has been palced",
          icon: "success",
        });
        $("#txt-cash").val("");
        loadProducts();
      },
      error: function (error) {
        Swal.fire({
          title: "Error",
          text: "Payment failed. Please try again.",
          icon: "error",
        });
      },
    });
  }
  if (paymentMethod === "CARD") {
    if (cart.length === 0 || subTotal === 0) {
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
        icon: "warning",
        title: "Cart is emplty!",
      });
      return;
    }

    if ($("#card-num-id").val() == "" || $("#bank-id").val() == "") {
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
        icon: "warning",
        title: "Card detail is empty!",
      });
      return;
    }

    let order = {
      customerContact: contact,
      customerName: isDemoUser === true ? demoCusName : customerName,
      subTotal: subTotal,
      addedPoints: point,
      inventories: cart,
      cashierName: userdetail.username,
      paymentMethod: paymentMethod,
      isDemo: isDemoUser,
      getqty: cart.length,
    };
    console.log(order);
    $.ajax({
      url: BASE_URL + "api/v1/sale",
      headers: {
        Authorization: "Bearer " + userdetail.jwt,
      },
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(order),
      success: function (response) {
        console.log(response);
        $("#btn-clear").click();
        $("#txt-cus-contact").val("");
        $("#txt-customer-name").text("");
        $("#card-num-id").val("");
        $("#bank-id").val("");
        $("#txt-cus-contact").css({
          "border-color": "gray",
        });
        $("#txt-demo-name").val("");
        $("#added-new-point").text("");

        Swal.fire({
          title: "Payment Successful",
          text: "payment has been palced",
          icon: "success",
        });
        loadProducts();
      },
      error: function (error) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Payment failed. Please try again.",
          icon: "error",
        });
      },
    });
  }
});

function checkSliderOverflow() {
  var $slider = $(".draggable.slider");
  var $brandList = $("#brand-list");
  var $moveLeft = $("#btn-move-left");
  var $moveRight = $("#btn-move-right");

  if ($brandList[0].scrollWidth > $slider.width()) {
    $moveLeft.show();
    $moveRight.show();
  } else {
    $moveLeft.hide();
    $moveRight.hide();
  }
}

checkSliderOverflow();
$(window).resize(checkSliderOverflow);

var observer = new MutationObserver(checkSliderOverflow);
observer.observe(document.getElementById("brand-list"), {
  childList: true,
  subtree: true,
});

$("#card").hide();

$("#payment-method-checkbox").click(function () {
  if ($(this).prop("checked")) {
    $("#cash").hide();
    $("#card").show();
    paymentMethod = "CARD";
  } else {
    $("#cash").show();
    $("#card").hide();
    paymentMethod = "CASH";
  }
});

$("#card-num-id").on("input", function () {
  let cvc = $(this).val().replace(/\D/g, "");
  if (cvc.length > 3) {
    cvc = cvc.substring(0, 3);
  }
  $(this).val(cvc);

  if (cvc.length !== 3) {
    $(this).css("border-color", "red");
  } else {
    $(this).css("border-color", "");
  }
});
