import withReactContent from "sweetalert2-react-content";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "utils/Swal";
import CustomButton from "components/CustomButton";
import CustomInput from "components/CustomInput";
import Layout from "components/Layout";

function Register() {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (email && password && firstName && lastName) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, firstName, lastName, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };
    axios
      .post("register", body)
      .then((res) => {
        const { message, data } = res.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
        if (data) {
          navigate("/login");
        }
      })
      .catch((err) => {
        const { message } = err.response.data;
        MySwal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
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
            id="inputEmail"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomInput
            id="inputFirstName"
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <CustomInput
            id="inputLastName"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <CustomInput
            id="inputPassword"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomButton
            id="btn-register"
            label="Register"
            loading={loading || disabled}
          />
        </form>
      </div>
    </Layout>
  );
}

export default Register;
