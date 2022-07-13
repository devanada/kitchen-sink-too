import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { reduxAction } from "../../utils/redux/actions/action";
import Layout from "../../components/Layout";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { apiRequest } from "../../utils/apiRequest";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      email,
      password,
    };
    apiRequest("login", "post", body)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        dispatch(reduxAction("IS_LOGGED_IN", true));
        alert("Login Successful");
        navigate("/profile");
      })
      .catch((err) => {
        const { data } = err.response;
        alert(data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <form
          className="flex flex-col gap-4 min-w-[40%]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <CustomInput
            id="input-email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomInput
            id="input-password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-black dark:text-white">
            Don't have an account? Register{" "}
            <Link id="to-register" to="/register">
              here!
            </Link>
          </p>
          <CustomButton
            id="btn-login"
            label="Login"
            loading={loading || disabled}
          />
        </form>
      </div>
    </Layout>
  );
}

export default Login;
