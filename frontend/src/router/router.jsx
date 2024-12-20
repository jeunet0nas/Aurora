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

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/catalog"
          element={
            <MainLayout>
              <Catalog />
            </MainLayout>
          }
        />
        <Route
          path="catalog/book/:slug"
          element={
            <MainLayout>
              <BookDetail />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />
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
