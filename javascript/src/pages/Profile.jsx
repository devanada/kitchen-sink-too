import withReactContent from "sweetalert2-react-content";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Swal from "utils/Swal";
import CustomButton from "components/CustomButton";
import CustomInput from "components/CustomInput";
import Layout from "components/Layout";

function Profile() {
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(true);
  const [objSubmit, setObjSubmit] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      .get("profile")
      .then((res) => {
        const { email, first_name, last_name, image } = res.data.data;
        setEmail(email);
        setFirstName(first_name);
        setLastName(last_name);
        setImage(image);
      })
      .catch((err) => {
        const { data } = err.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
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
    axios
      .put("profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { message } = res;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
        setObjSubmit({});
      })
      .catch((err) => {
        const { data } = err.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

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

export default Profile;
