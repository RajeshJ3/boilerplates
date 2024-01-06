import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authenticate, deAuthenticate } from "../redux/auth";

import { useNavigate } from "react-router-dom";

import { getUserCredentials } from "../utils/helpers";
import urls from "../utils/urls.json";

export default function Unprotected() {
  const [loaded, setLoaded] = useState(false);

  const authSlice = useSelector((state) => state.auth);
  const isAuthenticated = authSlice.isAuthenticated;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const credentials = getUserCredentials();
    if (
      credentials.accessToken &&
      credentials.refreshToken &&
      credentials.user
    ) {
      dispatch(authenticate({ user: credentials.user }));
      navigate(urls.dashboard.absolutePath);
    } else {
      dispatch(deAuthenticate());
    }
    setLoaded(true);
  }, [dispatch, navigate]);

  return loaded && !isAuthenticated && <Outlet />;
}
