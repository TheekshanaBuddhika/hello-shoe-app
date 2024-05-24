function getallsales() {
  $.ajax({
    url: BASE_URL + "api/v1/sale",
    headers: {
      Authorization: "Bearer " + userdetail.jwt,
    },
    method: "GET",
    success: function (res) {
      if (Array.isArray(res)) {
        const today = new Date();
        const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
        let html = "";

        res.forEach((element) => {
          const purchaseDate = new Date(element.purchaseDate);
          const timeDiff = today - purchaseDate;

          if (timeDiff <= threeDaysInMilliseconds) {
            html += `
                <tr style="font-size: 10px">
                  <td class="text-center text-dark bg-light-subtle" style="width:80px;">${element.saleId}</td>
                  <td class="text-center">${element.customerName}</td>
                  <td class="text-center">${element.customerContact}</td>
                  <td class="text-center">${element.getqty}</td>
                  <td class="text-center">${element.purchaseDate}</td>
                  <td class="text-center">${element.cashierName}</td>
                  <td class="text-center">${element.subTotal}</td>
                  <td class="d-flex">
                    <button style="height: 35px" class="btn btn-sm btn-light btn-edit-refund">
                      <i class="bi bi-pen-fill"></i>Edit
                    </button>
                  </td>
                </tr>
              `;
          }
        });

        // Update the table body once outside of the loop
        $("#tbl-refund-body").html(html);
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

// Call the function to fetch and append sales to the table
getallsales();
