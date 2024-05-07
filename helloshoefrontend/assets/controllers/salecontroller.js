//   payment
$("#card").hide();

$("#payment-method-checkbox").click(function () {
  $("#cash").toggle(!$(this).prop("checked"));
  $("#card").toggle($(this).prop("checked"));
});
