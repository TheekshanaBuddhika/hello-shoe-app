$("#sup-name").on("input", function () {
  const supplierName = $(this).val();
  if (supplierName.length < 5) {
    $("#sup-name-error").text(
      "Supplier name must be at least 5 characters long."
    );
  } else {
    $("#sup-name-error").text("");
  }
});

// Function to validate contact numbers
$("#sup-contact-1, #sup-contact-2").on("input", function () {
  const contactNumber = $(this).val();
  if (!/^\d+$/.test(contactNumber)) {
    $("#sup-contact-error").text(
      "Contact numbers should contain only numbers."
    );
  } else {
    $("#sup-contact-error").text("");
  }
});

// Function to validate email
$("#sup-email").on("input", function () {
  const email = $(this).val();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    $("#sup-email-error").text("Invalid email address.");
  } else {
    $("#sup-email-error").text("");
  }
});

// Function to validate address fields
$(
  "#sup-address-lane, #sup-address-country, #sup-address-city, #sup-address-state, #sup-origin-country"
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

// Function to validate postal code
$("#sup-address-code").on("input", function () {
  const postalCode = $(this).val();
  if (!/^\d+$/.test(postalCode)) {
    $("#sup-address-code-error").text(
      "Postal code should contain only numbers."
    );
  } else {
    $("#sup-address-code-error").text("");
  }
});
