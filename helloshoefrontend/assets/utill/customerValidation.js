$("#customer-name").on("input", function () {
  const name = $(this).val();
  if (name.length < 5) {
    $("#customer-name-error").text("Name must be at least 5 characters long.");
  } else {
    $("#customer-name-error").text("");
  }
});

$("#cus-gender").on("change", function () {
  const gender = $(this).val();
  if (gender === "") {
    $("#cus-gender-error").text("Please select a gender.");
  } else {
    $("#cus-gender-error").text("");
  }
});

$("#cus-contact").on("input", function () {
  const contactNumber = $(this).val();
  if (!/^\d+$/.test(contactNumber)) {
    $("#cus-contact-error").text("Contact number should contain only numbers.");
  } else {
    $("#cus-contact-error").text("");
  }
});

$("#customer-email").on("input", function () {
  const email = $(this).val();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    $("#customer-email-error").text("Invalid email address.");
  } else {
    $("#customer-email-error").text("");
  }
});

$(
  "#customer-address-lane, #customer-address-country, #customer-address-city, #customer-address-state, #customer-origin-country"
).on("input", function () {
  const fieldValue = $(this).val();
  if (fieldValue.length < 5) {
    $(this)
      .siblings(".error-message")
      .text("Field must have at least 5 characters.");
  } else {
    $(this).siblings(".error-message").text("");
  }
});

$("#customer-address-code").on("input", function () {
  const postalCode = $(this).val();
  if (!/^\d+$/.test(postalCode)) {
    $("#customer-address-code-error").text(
      "Postal code should contain only numbers."
    );
  } else {
    $("#customer-address-code-error").text("");
  }
});
