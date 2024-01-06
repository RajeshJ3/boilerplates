import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authenticate, deAuthenticate } from "../redux/auth";

import { useNavigate } from "react-router-dom";

import { getUserCredentials } from "../utils/helpers";

export default function AnyAuth() {
  const [loaded, setLoaded] = useState(false);

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
    } else {
      dispatch(deAuthenticate());
    }
    setLoaded(true);
  }, [dispatch, navigate]);

  return loaded && <Outlet />;
}
