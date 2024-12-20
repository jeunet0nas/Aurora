import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/HomePage/Home";
import LoginSignup from "../pages/LoginSignup/LoginSignup";
import Catalog from "../pages/Catalog/Catalog";
import BookDetail from "../pages/BookDetail/BookDetail";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Profile from "../pages/UserProfile/Profile";
import ChangePassword from "../pages/ChangePassword/ChangePassword";

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
          path="catalog/book/:slug"
          element={
            <MainLayout>
              <BookDetail />
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
