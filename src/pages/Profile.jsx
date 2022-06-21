import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import CustomInput from "../components/CustomInput";
import { fetchData } from "../utils/fetchData";

function Profile() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const fetchDatas = () => {
    fetchProfile();
    fetchProfile();
    fetchProfile();
  };

  const fetchProfile = async () => {
    fetchData("profile", "get", {}, token)
      .then((res) => {
        const { email, first_name, last_name } = res.data;
        setEmail(email);
        setFirstName(first_name);
        setLastName(last_name);
      })
      .catch((err) => {
        const { response } = err;
        if (response.status === 401) {
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const body = {
    //   email,
    //   password,
    // };
    // fetchData(
    //   "https://alta-kitchen-sink.herokuapp.com/api/v1/login",
    //   "post",
    //   body
    // )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Layout>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <CustomInput
              type="email"
              placeholder="Email"
              value={email}
              disabled
            />
            <CustomInput
              type="text"
              placeholder="First Name"
              value={firstName}
              disabled
            />
            <CustomInput
              type="text"
              placeholder="Last Name"
              value={lastName}
              disabled
            />
            <button>Submit</button>
          </form>
        </div>
      </Layout>
    );
  }
}

export default Profile;
