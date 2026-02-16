import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Publish from "./pages/Publish/Publish";
import Profile from "./pages/Profile/Profile";
import Roles from "./pages/Roles/Roles";
import { Toaster } from "react-hot-toast";
import EmailVerify from "./components/EmailVerify/EmailVerify";
import EmailVerifyCheck from "./components/EmailVerifyCheck/EmailVerifyCheck";
import UserDetails from "./pages/UserDetails/UserDetails";

// ================= PUBLIC ROUTE =================
const PublicRoute = () => {
  const adminData = localStorage.getItem("adminData");
  return adminData ? <Navigate to="/app/dashboard" replace /> : <Outlet />;
};

// ================= PRIVATE ROUTE =================
const PrivateRoute = () => {
  const adminData = localStorage.getItem("adminData");
  return adminData ? <Outlet /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <>
      <Routes>
        {/* PUBLIC */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/emailverify/:token" element={<EmailVerify />} />
          <Route path="/emailverifycheck" element={<EmailVerifyCheck />} />
        </Route>

        {/* PRIVATE */}
        <Route element={<PrivateRoute />}>
          <Route path="/app" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="roles" element={<Roles />} />
            <Route path="publish" element={<Publish />} />
            <Route path="profile" element={<Profile />} />

              <Route path="users/:userId" element={<UserDetails />} />
          </Route>
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/register" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />

    </>
  );
};

export default App;
