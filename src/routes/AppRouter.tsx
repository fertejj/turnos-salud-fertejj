import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../shared/components/ui/Spinner";
import { ROUTES } from "./routes";
import { ProfessionalRoutes } from "./ProfessionalRoutes";
import PrivateRoute from "./PrivateRoute";

const SpinnerFallback = (
  <div className="h-screen flex justify-center items-center">
    <Spinner />
  </div>
);

// Lazy imports
const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));
const Home = lazy(() => import("../app/Home"));
const NotFound = lazy(() => import("../shared/pages/NotFound"));
const Unauthorized = lazy(() => import("../shared/pages/Unauthorized"));
const PublicRoute = lazy(() => import("./PublicRoute"));

export default function AppRouter() {
  return (
    <Suspense fallback={SpinnerFallback}>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path={ROUTES.login}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.register}
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Ruta protegida de inicio */}
        <Route
          path={ROUTES.home}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Rutas del dashboard profesional */}
        <Route
          path={ROUTES.dashboard.profesional + "/*"} // 👈 importante
          element={<ProfessionalRoutes />}
        />

        {/* Rutas de error */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
