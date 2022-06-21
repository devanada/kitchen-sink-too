import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";

import Layout from "../../components/Layout";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { apiRequest } from "../../utils/apiRequest";
import { TokenContext } from "../../utils/context";

function Login() {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();
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
        setToken(token);
        alert("Login Successful");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  if (token === "0") {
    return (
      <Layout>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <form
            className="flex flex-col gap-4 min-w-[40%]"
            onSubmit={(e) => handleSubmit(e)}
          >
            <CustomInput
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-black dark:text-white">
              Don't have an account? Register <Link to="/register">here!</Link>
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
  } else {
    return <Navigate to="/profile" />;
  }
}

export default Login;
