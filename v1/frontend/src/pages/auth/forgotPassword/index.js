import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setActivePathId, setNotify } from "../../../redux/utils";

import urls from "../../../utils/urls.json";
import { DOMAIN } from "../../../utils/config";

import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setActivePathId(urls.auth.children.forgotPassword.pathId));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    // handle form submit

    e.preventDefault();
    // remove errors from state, if any
    setError(null);
    // set loading to true
    setLoading(true);

    try {
      // make API request
      await axios({
        method: "POST",
        url: `${DOMAIN}/auth/password/reset/`,
        data: {
          email,
        },
      });

      // set loading to false
      setLoading(false);

      // notify
      dispatch(
        setNotify({
          open: true,
          action: "Email Successfully Sent! (if email-id is valid)",
          severity: "success",
          autoHideDuration: 5000,
          vertical: "bottom",
          horizontal: "right",
        })
      );
    } catch (err) {
      // set loading to false
      setLoading(false);

      // notify
      dispatch(
        setNotify({
          open: true,
          action: "Unable to send email!",
          severity: "error",
          autoHideDuration: 5000,
          vertical: "bottom",
          horizontal: "right",
        })
      );
    }
  };

  const handleChange = (func, value) => {
    // handle change of input values

    // remove errors from state, if anny
    setError(null);
    func(value);
  };

  return (
    <div>
      <p>Forgot Password</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          required
          type="email"
          placeholder="john.doe@example.com"
          value={email}
          onChange={(e) => handleChange(setEmail, e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Sending" : "Send"}
        </button>
      </form>
      <button onClick={() => navigate(urls.auth.children.login.absolutePath)}>
        Back to Login
      </button>
    </div>
  );
}
