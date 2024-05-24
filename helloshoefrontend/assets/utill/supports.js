function updateDateTime() {
  const now = new Date();
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const dateString = now.toLocaleDateString("en-US", dateOptions);
  const timeString = now.toLocaleTimeString("en-US", timeOptions);

  $("#datetime").text(`${dateString} | ${timeString}`);
}

$(document).ready(function () {
  if (userdetail.role === "SUPER_ADMIN" || userdetail.role === "ADMIN") {
    $("#admin_content").css("display", "block");
  }

  if (userdetail.role === "USER") {
    $("#sale_content").css("display", "block");
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
});
