const axios = require("axios");
const Base64 = require("js-base64").Base64;

const getAllObjects = (url, config) => {
  const newUrl = `${url}?api_key=${process.env.KEY}`;
  return axios.get(newUrl, config).then(res => {
    const { data } = res;
    return data;
  });
};

const getSingleObject = (url, id, config) => {
  const newUrl = `${url}/${id}?api_key=${process.env.KEY}`;
  return axios.get(newUrl, config).then(res => {
    const { data } = res;
    return data;
  });
};

const updateSingleObject = (url, id, payload, config) => {
  const newUrl = `${url}/${id}/?api_key=${process.env.KEY}`;
  return axios.patch(newUrl, payload, config).then(res => {
    const { data } = res;
    return data;
  });
};

const deleteSingleObject = (url, id, config) => {
  const newUrl = `${url}/${id}/?api_key=${process.env.KEY}`;
  return axios.delete(newUrl, config).then(res => {
    const { data } = res;
    return data;
  });
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
