import { BrowserRouter, Routes, Route } from "react-router-dom";

// auth pages
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";
import SignupVerification from "./pages/auth/signupVerification";

// account pages
import Account from "./pages/account/account";
import UpdateAccount from "./pages/account/updateAccount";

// dashboard pages
import Dashboard from "./pages/dashboard/dashboard";

// hoc
import Protected from "./hoc/protected";
import Unprotected from "./hoc/unprotected";
import AnyAuth from "./hoc/anyAuth";

// utils
import urls from "./utils/urls.json";

export default function App() {
  const authRoutes = () => (
    <>
      <Route path={urls.auth.path} element={<Unprotected />}>
        <Route path={urls.auth.children.login.path} element={<Login />}></Route>
        <Route
          path={urls.auth.children.signup.path}
          element={<Signup />}
        ></Route>
        <Route
          path={urls.auth.children.forgotPassword.path}
          element={<ForgotPassword />}
        ></Route>
        <Route
          path={urls.auth.children.resetPassword.path}
          element={<ResetPassword />}
        ></Route>
      </Route>
      <Route path={urls.auth.path} element={<AnyAuth />}>
        <Route
          path={urls.auth.children.signupVerification.path}
          element={<SignupVerification />}
        ></Route>
      </Route>
    </>
  );

  const accountRoutes = () => (
    <Route path={urls.account.path} element={<Protected />}>
      <Route
        path={urls.account.children.account.path}
        element={<Account />}
      ></Route>
      <Route
        path={urls.account.children.updateAccount.path}
        element={<UpdateAccount />}
      ></Route>
    </Route>
  );

  const dashboardRoues = () => (
    <Route path={urls.dashboard.path} element={<Protected />}>
      <Route
        path={urls.dashboard.children.dashboard.path}
        element={<Dashboard />}
      ></Route>
    </Route>
  );

  return (
    <BrowserRouter>
      <Routes>
        {dashboardRoues()}
        {accountRoutes()}
        {authRoutes()}
      </Routes>
    </BrowserRouter>
  );
}
