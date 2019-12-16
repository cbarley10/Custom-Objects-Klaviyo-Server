const axios = require("axios");
const Base64 = require("js-base64").Base64;

const getAllObjects = async (url, config) => {
  const newUrl = `${url}?api_key=${process.env.KEY}`;
  const response = await axios.get(newUrl, config);
  return response.data;
};

const getSingleObject = async (url, id, config) => {
  const newUrl = `${url}/${id}?api_key=${process.env.KEY}`;
  const response = await axios.get(newUrl, config);
  return response.data;
};

const updateSingleObject = async (url, id, payload, config) => {
  const newUrl = `${url}/${id}/?api_key=${process.env.KEY}`;
  const response = await axios.patch(newUrl, payload, config);
  console.log(newUrl);
  return response.data;
};

const deleteSingleObject = async (url, id, config) => {
  const newUrl = `${url}/${id}/?api_key=${process.env.KEY}`;
  const response = await axios.delete(newUrl, config);
  return response.data;
};

const checkEmail = (url, email, config) => {
  let newEmail = encodeURIComponent(email);
  const newUrl = `${url}?api_key=${process.env.KEY}&email=${newEmail}`;
  return axios
    .get(newUrl, config)
    .then(res => {
      const { data, status } = res;
      return { data, status };
    })
    .catch(err => {
      return err;
    });
};

const createContact = (url, token, email) => {
  let payload = JSON.stringify({
    token: token,
    properties: {
      $email: email
    }
  });

  payload = Base64.encode(payload);
  const newUrl = `${url}?data=${payload}`;
  return axios.get(newUrl).then(res => {
    const { status, data } = res;
    return { status, data };
  });
};

const createNewObject = (url, payload, config) => {
  const newUrl = `${url}/?api_key=${process.env.KEY}`;
  return axios.post(newUrl, payload, config).then(res => {
    const { data } = res;
    return data;
  });
};

module.exports = {
  getAllObjects,
  getSingleObject,
  updateSingleObject,
  deleteSingleObject,
  checkEmail,
  createContact,
  createNewObject
};
