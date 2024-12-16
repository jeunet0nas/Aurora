import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/HomePage/Home";
import LoginSignup from "../pages/LoginSignup/LoginSignup";
import Catalog from "../pages/Catalog/Catalog";

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
