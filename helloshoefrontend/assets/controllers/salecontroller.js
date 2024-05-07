$("#payment-method-checkbox").click(function () {
  var isChecked = $(this).prop("checked");
  if (isChecked) {
    $("#card").hide();
    $("#cash").css("display", "flex");
  } else {
    $("#cash").hide();
    $("#card").css("display", "flex");
  }
});
