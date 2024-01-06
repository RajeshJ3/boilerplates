import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setActivePathId, setNotify } from "../../../redux/utils";

import axios from "axios";

import { DOMAIN } from "../../../utils/config";
import { saveUserCredentials } from "../../../utils/helpers";

import urls from "../../../utils/urls.json";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword1, setErrorPassword1] = useState(null);
  const [errorPassword2, setErrorPassword2] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setActivePathId(urls.auth.children.signup.pathId));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // remove errors from state, if any
    setError(null);
    setErrorEmail(null);
    setErrorPassword1(null);
    setErrorPassword2(null);
    // set loading to true
    setLoading(true);

    try {
      // make API request
      const response = await axios({
        method: "POST",
        url: `${DOMAIN}/auth/registration/`,
        data: {
          email,
          password1,
          password2,
        },
      });
      // save user credentials
      saveUserCredentials(response.data);
      // redirect to home page

      // notify
      dispatch(
        setNotify({
          open: true,
          action: "Signed up Successfully!",
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
        setErrorEmail(error_object.email && error_object.email[0]);
        setErrorPassword1(error_object.password1 && error_object.password1[0]);
        setErrorPassword2(error_object.password2 && error_object.password2[0]);
        setError(
          error_object.non_field_errors && error_object.non_field_errors[0]
        );
      } catch {
        // default error message
        setError("Unable to Sign up");
      }
    }
  };

  const handleChange = (func, value) => {
    // remove errors from state, if anny
    setError(null);
    setErrorEmail(null);
    setErrorPassword1(null);
    setErrorPassword2(null);
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
        {errorEmail && <p style={{ color: "red" }}>{errorEmail}</p>}
        <br />
        <label>Password</label>
        <input
          required
          type="password"
          placeholder="***********"
          value={password1}
          onChange={(e) => handleChange(setPassword1, e.target.value)}
        />
        {errorPassword1 && <p style={{ color: "red" }}>{errorPassword1}</p>}
        <br />
        <label>Confirm Password</label>
        <input
          required
          type="password"
          placeholder="***********"
          value={password2}
          onChange={(e) => handleChange(setPassword2, e.target.value)}
        />
        {errorPassword2 && <p style={{ color: "red" }}>{errorPassword2}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <br />
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        <button type="submit" disabled={loading}>
          {loading ? "Signing up" : "Sign up"}
        </button>
      </form>
      <br />
      <button onClick={() => navigate(urls.auth.children.login.absolutePath)}>
        Already have an account?
      </button>
    </>
  );
}
