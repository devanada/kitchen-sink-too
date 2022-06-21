import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { reduxAction } from "../../utils/redux/actions/action";
import Layout from "../../components/Layout";
import CustomInput from "../../components/CustomInput";
import { fetchData } from "../../utils/fetchData";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    fetchData("login", "post", body)
      .then((res) => {
        const { token } = res.data;
        dispatch(reduxAction("SET_TOKEN", token));
        localStorage.setItem("token", token);
        alert("Login Successful");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
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
          <button>Login</button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
