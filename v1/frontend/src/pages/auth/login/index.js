import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setActivePathId, setNotify } from "../../../redux/utils";

import axios from "axios";

import { DOMAIN } from "../../../utils/config";
import { saveUserCredentials } from "../../../utils/helpers";

import urls from "../../../utils/urls.json";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setActivePathId(urls.auth.children.login.pathId));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // remove errors from state, if any
    setError(null);
    // set loading to true
    setLoading(true);

    try {
      // make API request
      const response = await axios({
        method: "POST",
        url: `${DOMAIN}/auth/login/`,
        data: {
          email,
          password,
        },
      });
      // save user credentials
      saveUserCredentials(response.data);
      // redirect to home page

      // notify
      dispatch(
        setNotify({
          open: true,
          action: "Logged in Successfully!",
          severity: "success",
          autoHideDuration: 5000,
          vertical: "bottom",
          horizontal: "right",
        })
      );

      navigate(urls.dashboard.absolutePath);
    } catch (err) {
      // set loading to false
      setLoading(false);
      try {
        // fetch error
        let error_object = JSON.parse(err.request.response);
        // set error
        setError(error_object.non_field_errors[0]);
      } catch {
        // default error message
        setError("Unable to log in with provided credentials");
      }
    }
  };

  const handleChange = (func, value) => {
    // remove errors from state, if anny
    setError(null);
    func(value);
  };

  return (
    <>
      <h3>Log In</h3>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          required
          type="email"
          placeholder="john.doe@example.com"
          value={email}
          onChange={(e) => handleChange(setEmail, e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          required
          type="password"
          placeholder="***********"
          value={password}
          onChange={(e) => handleChange(setPassword, e.target.value)}
        />
        {/* <br /> */}
        <p
          onClick={() =>
            navigate(urls.auth.children.forgotPassword.absolutePath)
          }
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          {urls.auth.children.forgotPassword.name}
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging In" : "Log In"}
        </button>
      </form>
      <br />
      <button onClick={() => navigate(urls.auth.children.signup.absolutePath)}>
        Don't have an account?
      </button>
    </>
  );
}
