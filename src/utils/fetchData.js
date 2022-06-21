import axios from "axios";

const fetchData = async (url, method, body, token) => {
  var config = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: body,
  };

  const response = await axios(config);
  return response.data;
};

export { fetchData };
