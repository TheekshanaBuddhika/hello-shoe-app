$("#admin-profile-pic").attr(
  "src",
  `https://drive.google.com/thumbnail?id=${userdetail.profilePic}&sz=w1000`
);

$("#admin-user-name").text(userdetail.role);

if (userdetail.role === "SUPER_ADMIN") {
  $("#admin_content").css("display", "block");
  $("#usernamegreeting").text("Hi Super Admin");
  $("#side_bar_option").append(`
  <li class="admin-item nav-item nav-btn">
  <a href="#" class="nav-link nv-btn">
    <svg class="bi me-2" width="16" height="20">
      <i class="fas fa-user fa-xl fa-fw"></i>
    </svg>
    <small class="text-secondary fs-5 fw-bold ms-3"
      >Admin Board</small
    >
  </a>
</li>
<li class="pos-item mt-3 nav-btn">
<a a href="#" class="nav-link">
  <svg class="bi me-2" width="16" height="20">
    <i class="fas fa-money-bill-alt fa-lg fa-xl"></i>
  </svg>
  <small class="text-secondary fs-5 fw-bold ms-3">Sale</small>
</a>
</li>
<li class="inventory-item mt-3 nav-btn">
<a a href="#" class="nav-link">
  <svg class="bi me-2" width="16" height="20">
    <i class="fas fa-store fa-xl fa-fw"></i>
  </svg>
  <small class="text-secondary fs-5 fw-bold ms-3"
    >Inventory</small
  >
</a>
</li>

<li class="refund-item mt-3 nav-btn">
<a a href="#" class="nav-link">
  <svg class="bi me-2" width="16" height="20">
    <i class="fas fa-exchange-alt fa-xl fa-fw"></i>
  </svg>
  <small class="text-secondary fs-5 fw-bold ms-3"
    >Refund</small
  >
</a>
</li>
<li class="supplier-item mt-3 nav-btn">
<a a href="#" class="nav-link">
  <svg class="bi me-2" width="16" height="20">
    <i class="fas fa-people-carry fa-xl fa-fw"></i>
  </svg>
  <small class="text-secondary fs-5 fw-bold ms-3"
    >Supplier</small
  >
</a>
</li>
<li class="customer-item mt-3 nav-btn">
<a a href="#" class="nav-link">
  <svg class="bi me-2" width="16" height="20">
    <i class="fas fa-address-book fa-xl fa-fw"></i>
  </svg>
  <small class="text-secondary fs-5 fw-bold ms-3"
    >Customers</small
  >
</a>
</li>
<li class="employee-item mt-3 nav-btn">
<a a href="#" class="nav-link">
  <svg class="bi me-2" width="16" height="20">
    <i class="fas fa-users fa-xl fa-fw"></i>
  </svg>
  <small class="text-secondary fs-5 fw-bold ms-3"
    >Employee</small
  >
</a>
</li>
    
  <li class="branch-item mt-3 nav-btn">
  <a a href="#" class="nav-link">
    <svg class="bi me-2" width="16" height="20">
     <i class="fas fa-building fa-xl fa-fw"></i>
    </svg>
    <small class="text-secondary fs-5 fw-bold ms-3"
      >Branch</small
    >
  </a>
</li>
    `);
}

if (userdetail.role === "ADMIN") {
  $("#admin_content").css("display", "block");
  $("#usernamegreeting").text("Hi Admin");
  $("#side_bar_option").append(`
  <li class="admin-item nav-item nav-btn">
  <a href="#" class="nav-link nv-btn">
    <svg class="bi me-2" width="16" height="20">
      <i class="fas fa-user fa-xl fa-fw"></i>
    </svg>
    <small class="text-secondary fs-5 fw-bold ms-3"
      >Admin Board</small
    >
  </a>
</li>
<li class="pos-item mt-3 nav-btn">
<a a href="#" class="nav-link">
  <svg class="bi me-2" width="16" height="20">
    <i class="fas fa-money-bill-alt fa-lg fa-xl"></i>
  </svg>
  <small class="text-secondary fs-5 fw-bold ms-3">Sale</small>
</a>
</li>
<li class="inventory-item mt-3 nav-btn">
<a a href="#" class="nav-link">
  <svg class="bi me-2" width="16" height="20">
    <i class="fas fa-store fa-xl fa-fw"></i>
  </svg>
  <small class="text-secondary fs-5 fw-bold ms-3"
    >Inventory</small
  >
</a>
</li>

<li class="refund-item mt-3 nav-btn">
<a a href="#" class="nav-link">
  <svg class="bi me-2" width="16" height="20">
    <i class="fas fa-exchange-alt fa-xl fa-fw"></i>
  </svg>
  <small class="text-secondary fs-5 fw-bold ms-3"
    >Refund</small
  >
</a>
</li>
<li class="supplier-item mt-3 nav-btn">
<a a href="#" class="nav-link">
  <svg class="bi me-2" width="16" height="20">
    <i class="fas fa-people-carry fa-xl fa-fw"></i>
  </svg>
  <small class="text-secondary fs-5 fw-bold ms-3"
    >Supplier</small
  >
</a>
</li>
<li class="customer-item mt-3 nav-btn">
<a a href="#" class="nav-link">
  <svg class="bi me-2" width="16" height="20">
    <i class="fas fa-address-book fa-xl fa-fw"></i>
  </svg>
  <small class="text-secondary fs-5 fw-bold ms-3"
    >Customers</small
  >
</a>
</li>
<li class="employee-item mt-3 nav-btn">
<a a href="#" class="nav-link">
  <svg class="bi me-2" width="16" height="20">
    <i class="fas fa-users fa-xl fa-fw"></i>
  </svg>
  <small class="text-secondary fs-5 fw-bold ms-3"
    >Employee</small
  >
</a>
      `);
}

if (userdetail.role === "USER") {
  $("#sale_content").css("display", "block");
  $("#side_bar_option").append(`
   
  <li class="pos-item mt-3 nav-btn">
  <a a href="#" class="nav-link">
    <svg class="bi me-2" width="16" height="20">
      <i class="fas fa-money-bill-alt fa-lg fa-xl"></i>
    </svg>
    <small class="text-secondary fs-5 fw-bold ms-3">Sale</small>
  </a>
  </li>
  <li class="inventory-item mt-3 nav-btn">
  <a a href="#" class="nav-link">
    <svg class="bi me-2" width="16" height="20">
      <i class="fas fa-store fa-xl fa-fw"></i>
    </svg>
    <small class="text-secondary fs-5 fw-bold ms-3"
      >Inventory</small
    >
  </a>
  </li>
  
  <li class="refund-item mt-3 nav-btn">
  <a a href="#" class="nav-link">
    <svg class="bi me-2" width="16" height="20">
      <i class="fas fa-exchange-alt fa-xl fa-fw"></i>
    </svg>
    <small class="text-secondary fs-5 fw-bold ms-3"
      >Refund</small
    >
  </a>
  </li>
  <li class="supplier-item mt-3 nav-btn">
  <a a href="#" class="nav-link">
    <svg class="bi me-2" width="16" height="20">
      <i class="fas fa-people-carry fa-xl fa-fw"></i>
    </svg>
    <small class="text-secondary fs-5 fw-bold ms-3"
      >Supplier</small
    >
  </a>
  </li>
  <li class="customer-item mt-3 nav-btn">
  <a a href="#" class="nav-link">
    <svg class="bi me-2" width="16" height="20">
      <i class="fas fa-address-book fa-xl fa-fw"></i>
    </svg>
    <small class="text-secondary fs-5 fw-bold ms-3"
      >Customers</small
    >
  </a>
  </li>
 
      `);
}
