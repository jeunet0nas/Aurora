import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home/Home";
import LoginSignup from "../pages/LoginSignup/LoginSignup";
import Catalog from "../pages/Catalog/Catalog";
import BookDetail from "../pages/BookDetail/BookDetail";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Profile from "../pages/UserProfile/Profile";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import UserOrders from "../pages/UserOrders/UserOrders";
import NotFound from "../pages/NotFound/NotFound";
import AboutUs from "../pages/AboutUs/AboutUs";
import AuthorDetail from "../pages/AuthorDetail/AuthorDetail";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang chủ */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        {/* Catalog */}
        <Route
          path="/catalog"
          element={
            <MainLayout>
              <Catalog />
            </MainLayout>
          }
        />
        {/* Chi tiết sách */}
        <Route
          path="/book/:slug"
          element={
            <MainLayout>
              <BookDetail />
            </MainLayout>
          }
        />
        {/* Chi tiết tác giả */}
        <Route
          path="/author/:author_slug"
          element={
            <MainLayout>
              <AuthorDetail />
            </MainLayout>
          }
        />
        {/* Giỏ hàng */}
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />
        {/* Thanh toán */}
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        />
        {/* Hồ sơ cá nhân */}
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />
        {/* Đổi mật khẩu */}
        <Route
          path="/change-password"
          element={
            <MainLayout>
              <ChangePassword />
            </MainLayout>
          }
        />
        {/* Thông tin đơn hàng */}
        <Route
          path="/user/orders"
          element={
            <MainLayout>
              <UserOrders />
            </MainLayout>
          }
        />
        {/* Thông tin */}
        <Route
          path="/about-us"
          element={
            <MainLayout>
              <AboutUs />
            </MainLayout>
          }
        />
        {/* Lỗi*/}
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
        {/* Đăng nhập, đăng kí */}
        <Route
          path="/authenticate"
          element={
            <AuthLayout>
              <LoginSignup />
            </AuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
