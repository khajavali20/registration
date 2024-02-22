import { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

function RouteGuard({ children }: { readonly children: ReactNode }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return children;
}

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={"login"} />} />
    </Routes>
  );
};
