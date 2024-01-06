import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
import { setActivePathId } from "../../../redux/utils";

import urls from "../../../utils/urls.json";
import { DOMAIN } from "../../../utils/config";

import axios from "axios";

export default function SignupVerification() {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);

  // redux
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // react-router-dom
  const { key } = useParams();

  useEffect(() => {
    axios({
      method: "POST",
      url: `${DOMAIN}/auth/registration/verify-email/`,
      data: {
        key,
      },
    })
      .then(() => {
        setVerified(true);
      })
      .catch((err) => {
        console.log(err);
        setError("Unable to verify!");
      });
  }, [key]);

  useEffect(() => {
    dispatch(setActivePathId(urls.auth.children.signupVerification.pathId));
  }, [dispatch]);

  return verified ? (
    <>
      <p>Email Verified Successfully</p>
      <button onClick={() => navigate(urls.auth.children.login.absolutePath)}>
        Continue
      </button>
    </>
  ) : error ? (
    <>
      <p>{error}</p>
      <button disabled onClick={() => {}}>
        Resend Verification Email
      </button>
      <br />
      <button
        onClick={() => {
          navigate(urls.auth.children.login.absolutePath);
        }}
      >
        Continue to login
      </button>
    </>
  ) : (
    <p>Verifying..</p>
  );
}
