$(document).ready(function () {
  // initial view handler
  $("#login-wrapper").css("display", "flex");
  $("#dboard-wrapper").hide();
  $("#admin_content").hide();
  $("#sale_content").hide();
  $("#inventory_content").hide();
  $("#refund_content").hide();
  $("#supplier_content").hide();
  $("#customer_content").hide();
  $("#employee_content").hide();

  //   payment
  $("#cash").hide();
  $("#card").css("display", "flex");

  // Click event handler for employee-item
  $(".employee-item").click(function () {
    $("#admin_content").hide();
    $("#sale_content").hide();
    $("#inventory_content").hide();
    $("#refund_content").hide();
    $("#supplier_content").hide();
    $("#customer_content").hide();
    $("#employee_content").css("display", "block");
  });

  // Click event handler for customer-item
  $(".customer-item").click(function () {
    $("#admin_content").hide();
    $("#sale_content").hide();
    $("#inventory_content").hide();
    $("#refund_content").hide();
    $("#supplier_content").hide();
    $("#customer_content").css("display", "block");
    $("#employee_content").hide();
  });

  // Click event handler for supplier-item
  $(".supplier-item").click(function () {
    $("#admin_content").hide();
    $("#sale_content").hide();
    $("#inventory_content").hide();
    $("#refund_content").hide();
    $("#supplier_content").css("display", "block");
    $("#customer_content").hide();
    $("#employee_content").hide();
  });

  // Click event handler for refund-item
  $(".refund-item").click(function () {
    $("#admin_content").hide();
    $("#sale_content").hide();
    $("#inventory_content").hide();
    $("#refund_content").css("display", "block");
    $("#supplier_content").hide();
    $("#customer_content").hide();
    $("#employee_content").hide();
  });

  // Click event handler for inventory-item
  $(".inventory-item").click(function () {
    $("#admin_content").hide();
    $("#sale_content").hide();
    $("#inventory_content").css("display", "block");
    $("#refund_content").hide();
    $("#supplier_content").hide();
    $("#customer_content").hide();
    $("#employee_content").hide();
  });

  // Click event handler for pos-item
  $(".pos-item").click(function () {
    $("#admin_content").hide();
    $("#sale_content").css("display", "block");
    $("#inventory_content").hide();
    $("#refund_content").hide();
    $("#supplier_content").hide();
    $("#customer_content").hide();
    $("#employee_content").hide();
  });

  // Click event handler for admin-item
  $(".admin-item").click(function () {
    $("#admin_content").css("display", "block");
    $("#sale_content").hide();
    $("#inventory_content").hide();
    $("#refund_content").hide();
    $("#supplier_content").hide();
    $("#customer_content").hide();
    $("#employee_content").hide();
  });
});
