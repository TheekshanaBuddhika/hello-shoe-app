$(document).ready(function () {
  // initial view handler

  $("#admin_content").hide();
  $("#sale_content").hide();
  $("#inventory_content").hide();
  $("#refund_content").hide();
  $("#supplier_content").hide();
  $("#customer_content").hide();
  $("#employee_content").hide();
  $("#branch_content").hide();
  $("#manager_content").hide();

  $("#logout-btn").click(function () {
    localStorage.clear();
    window.location.href = "index.html";
  });

  // Click event handler for employee-item
  $(".employee-item").click(function () {
    $("#admin_content").hide();
    $("#sale_content").hide();
    $("#inventory_content").hide();
    $("#refund_content").hide();
    $("#supplier_content").hide();
    $("#customer_content").hide();
    $("#employee_content").css("display", "block");
    $("#branch_content").hide();
    $("#manager_content").hide();
  });

  // Click event handler for customer-item
  $(".customer-item").click(function () {
    loadAllCustomers();
    $("#admin_content").hide();
    $("#sale_content").hide();
    $("#inventory_content").hide();
    $("#refund_content").hide();
    $("#supplier_content").hide();
    $("#customer_content").css("display", "block");
    $("#employee_content").hide();
    $("#branch_content").hide();
    $("#manager_content").hide();
  });

  // Click event handler for supplier-item
  $(".supplier-item").click(function () {
    loadSuppliers();
    $("#admin_content").hide();
    $("#sale_content").hide();
    $("#inventory_content").hide();
    $("#refund_content").hide();
    $("#supplier_content").css("display", "block");
    $("#customer_content").hide();
    $("#employee_content").hide();
    $("#branch_content").hide();
    $("#manager_content").hide();
  });

  // Click event handler for refund-item
  $(".refund-item").click(function () {
    getAllSales();
    $("#admin_content").hide();
    $("#sale_content").hide();
    $("#inventory_content").hide();
    $("#refund_content").css("display", "flex");
    $("#supplier_content").hide();
    $("#customer_content").hide();
    $("#employee_content").hide();
    $("#branch_content").hide();
    $("#manager_content").hide();
  });

  // Click event handler for inventory-item
  $(".inventory-item").click(function () {
    loadItems();
    $("#admin_content").hide();
    $("#sale_content").hide();
    $("#inventory_content").css("display", "block");
    $("#refund_content").hide();
    $("#supplier_content").hide();
    $("#customer_content").hide();
    $("#employee_content").hide();
    $("#branch_content").hide();
    $("#manager_content").hide();
  });

  // Click event handler for pos-item
  $(".pos-item").click(function () {
    loadProducts();
    loadBrands();
    $("#admin_content").hide();
    $("#sale_content").css("display", "block");
    $("#inventory_content").hide();
    $("#refund_content").hide();
    $("#supplier_content").hide();
    $("#customer_content").hide();
    $("#employee_content").hide();
    $("#branch_content").hide();
    $("#manager_content").hide();
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
    $("#branch_content").hide();
    $("#manager_content").hide();
  });

  $(".branch-item").click(function () {
    $("#admin_content").hide();
    $("#sale_content").hide();
    $("#inventory_content").hide();
    $("#refund_content").hide();
    $("#supplier_content").hide();
    $("#customer_content").hide();
    $("#employee_content").hide();
    $("#manager_content").hide();
    $("#branch_content").css("display", "block");
  });
});
