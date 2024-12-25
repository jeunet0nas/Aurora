<div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary" id="admin-side-bar">
    <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="sidebarMenuLabel">Aurora Admin</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <h3>Logo</h3>
            <hr class="my-3">
            <ul class="nav flex-column">
                <li class="nav-item mt-2 mb-2">
                    <a style="color: #942446; font-size: 1rem" class="nav-link d-flex align-items-center gap-2" aria-current="page" href="#">
                        <i class="fas fa-dashboard"></i>
                        Dashboard
                    </a>
                </li>
                <li class="nav-item mt-2 mb-2">
                    <a style="color: #942446; font-size: 1rem" class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.authors.index')}}">
                        <i class="fas fa-dashboard"></i>
                        Tác giả
                    </a>
                </li>
                <li class="nav-item mt-2 mb-2">
                    <a style="color: #942446; font-size: 1rem" class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.books.index')}}">
                        <i class="fas fa-dashboard"></i>
                        Sách
                    </a>
                </li>
                <li class="nav-item mt-2 mb-2">
                    <a style="color: #942446; font-size: 1rem" class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.orders.index')}}">
                        <i class="fas fa-cart-shopping"></i>
                        Hóa đơn
                    </a>
                </li>
                <li class="nav-item mt-2 mb-2">
                    <a style="color: #942446; font-size: 1rem"  class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.coupons.index')}}">
                        <i class="fas fa-ticket"></i>
                        Mã khuyến mãi
                    </a>
                </li>
                <li class="nav-item mt-2 mb-2">
                    <a style="color: #942446; font-size: 1rem" class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.reviews.index')}}">
                        <i class="fas fa-dashboard"></i>
                        Đánh giá
                    </a>
                </li>
                <li class="nav-item mt-2 mb-2">
                    <a style="color: #942446; font-size: 1rem" class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.users.index')}}">
                        <i class="fas fa-dashboard"></i>
                        Người dùng
                    </a>
                </li>
            </ul>
            <hr class="my-3">
            <ul class="nav flex-column mb-auto">
                <li class="nav-item">
                    <a style="color: #942446; font-size: 1rem" class="nav-link d-flex align-items-center gap-2 mb-3" href="#" onclick="document.getElementById('AdminLogoutForm').submit()">
                        <svg class="bi">
                            <use xlink:href="#door-closed" />
                        </svg>
                        Sign out
                    </a>

                    <form id="AdminLogoutForm" action="{{route('admin.logout')}}" method="post">
                        @csrf
                    </form>
                </li>
            </ul>
        </div>
    </div>
</div>
