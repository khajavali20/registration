import { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/Landing.page";
import SignUpPage from "./pages/SignUp.page";

function RouteGuard({ children }: { readonly children: ReactNode }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/register"} />;
  }

  return children;
}

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={"register"} />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route
        path="landing"
        element={
          <RouteGuard>
            <LandingPage />
          </RouteGuard>
        }
      />
    </Routes>
  );
};
