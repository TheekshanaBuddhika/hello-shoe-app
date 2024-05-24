// const supplierAddresRegEx = /^[a-zA-Z0-9\s,.-_]{5,100}$/;
// const supplierNameRegex = /^[a-zA-Z0-9\s]{5,50}$/;
// const supplierContactRegex = /^[0-9()-]{5,20}$/;
// const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// let sArray = [];

// sArray.push({ field: $("#supplier-name"), regEx: supplierNameRegex });
// sArray.push({ field: $("#sup-contact-1"), regEx: supplierContactRegex });
// sArray.push({ field: $("#sup-contact-2"), regEx: supplierContactRegex });
// sArray.push({ field: $("#sup-email"), regEx: emailRegex });
// sArray.push({ field: $("#sup-address-lane"), regEx: supplierAddresRegEx });
// sArray.push({ field: $("#sup-address-state"), regEx: supplierAddresRegEx });
// sArray.push({ field: $("#sup-address-city"), regEx: supplierAddresRegEx });
// sArray.push({ field: $("#sup-address-country"), regEx: supplierAddresRegEx });
// sArray.push({ field: $("#sup-address-code"), regEx: supplierAddresRegEx });
// sArray.push({ field: $("#sup-origin-country"), regEx: supplierAddresRegEx });

// function validatesupplier() {
//   let isValid = true;
//   sArray.forEach(function (item) {
//     if (!item.regEx.test(item.field.val())) {
//       item.field.addClass("is-invalid");
//       isValid = false;
//     } else {
//       item.field.removeClass("is-invalid");
//       item.field.addClass("is-valid");
//     }
//   });
//   return isValid;
// }

// $("#supplier-inputs input").on("keydown keyup", function () {
//   let isTrue = validatesupplier();
//   if (isTrue) {
//     $("#btn-add-sup").prop("disabled", false);
//   } else {
//     $("#btn-add-sup").prop("disabled", true);
//   }
// });

// $("#btn-add-sup").prop("disabled", true);
