/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { reduxAction } from "../utils/redux/actions/action";
import Layout from "../components/Layout";
import CustomInput from "../components/CustomInput";
import { apiRequest } from "../utils/apiRequest";
import CustomButton from "../components/CustomButton";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [objSubmit, setObjSubmit] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    apiRequest("profile", "get", {})
      .then((res) => {
        const { email, first_name, last_name, image } = res.data;
        setEmail(email);
        setFirstName(first_name);
        setLastName(last_name);
        setImage(image);
      })
      .catch((err) => {
        const { data } = err.response;
        if ([401, 403].includes(data.code)) {
          localStorage.removeItem("token");
          dispatch(reduxAction("IS_LOGGED_IN", false));
          navigate("/login");
        }
        alert(data.message);
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    apiRequest("profile", "put", objSubmit, "multipart/form-data")
      .then((res) => {
        const { message } = res;
        alert(message);
        setObjSubmit({});
      })
      .catch((err) => {
        const { data } = err.response;
        alert(data.message);
      })
      .finally(() => fetchData());
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Layout>
        <div className="w-full h-full flex items-center justify-center gap-4">
          <img className="w-60 h-60" src={image} alt={image} />
          <form
            className="flex flex-col gap-4 min-w-[40%]"
            onSubmit={(e) => handleSubmit(e)}
          >
            <CustomInput
              id="input-file"
              type="file"
              onChange={(e) => {
                setImage(URL.createObjectURL(e.target.files[0]));
                handleChange(e.target.files[0], "image");
              }}
            />
            <CustomInput
              id="input-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleChange(e.target.value, "email")}
            />
            <CustomInput
              id="input-first-name"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => handleChange(e.target.value, "first_name")}
            />
            <CustomInput
              id="input-last-name"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => handleChange(e.target.value, "last_name")}
            />
            <CustomButton id="btn-submit" label="Submit" loading={loading} />
          </form>
        </div>
      </Layout>
    );
  }
}

export default Profile;
