import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setNotify } from "../../../redux/utils";

import urls from "../../../utils/urls.json";
import { DOMAIN } from "../../../utils/config";

import axios from "axios";

export default function ResetPassword() {
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const { uid, token } = useParams();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [errorPassword1, setErrorPassword1] = useState(null);
  const [errorPassword2, setErrorPassword2] = useState(null);

  // redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // handle form submit
    e.preventDefault();

    // remove errors from state, if any
    setError(null);
    setErrorPassword1(null);
    setErrorPassword2(null);

    // set loading to true
    setLoading(true);

    try {
      // make API request
      await axios({
        method: "POST",
        url: `${DOMAIN}/auth/password/reset/confirm/`,
        data: {
          uid: window.atob(uid),
          token,
          new_password1: newPassword1,
          new_password2: newPassword2,
        },
      });

      setLoading(false);

      // notify
      dispatch(
        setNotify({
          open: true,
          action: "Password changed!",
          severity: "success",
          autoHideDuration: 5000,
          vertical: "bottom",
          horizontal: "right",
        })
      );

      navigate(urls.auth.children.login.absolutePath);
    } catch (err) {
      setLoading(false);
      try {
        // fetch error
        let error_object = JSON.parse(err.request.response);

        // set error
        setErrorPassword1(
          error_object.new_password1 && error_object.new_password1[0]
        );
        setErrorPassword2(
          error_object.new_password2 && error_object.new_password2[0]
        );
        setError(
          error_object.non_field_errors && error_object.non_field_errors[0]
        );
      } catch {
        // default error message
        setError("Something Went Wrong!");
      }
    }
  };

  const handleChange = (func, value) => {
    // handle change of input values

    // remove errors from state, if anny
    setError(null);
    setErrorPassword1(null);
    setErrorPassword2(null);
    func(value);
  };

  return (
    <div>
      <h3>Reset Password</h3>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Password</label>
        <input
          required
          type="password"
          placeholder="***********"
          value={newPassword1}
          onChange={(e) => handleChange(setNewPassword1, e.target.value)}
        />
        {errorPassword1 && <p style={{ color: "red" }}>{errorPassword1}</p>}
        <br />
        <label>Confirm Password</label>
        <input
          required
          type="password"
          placeholder="***********"
          value={newPassword2}
          onChange={(e) => handleChange(setNewPassword2, e.target.value)}
        />
        {errorPassword2 && <p style={{ color: "red" }}>{errorPassword2}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <br />
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        <button type="submit" disabled={loading}>
          {loading ? "Changing" : "Change"} password
        </button>
      </form>
    </div>
  );
}
