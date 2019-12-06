const axios = require("axios");

const getAllObjects = (url, config) => {
  return axios.get(url, config).then(res => {
    const { data } = res;
    return data;
  });
};

const getSingleObject = (url, id, config) => {
  return axios.get(`${url}?item=${id}`, config).then(res => {
    const { data } = res;
    let foundItem = data.filter(item => id == item.klaviyo_internal_id);
    return foundItem;
  });
};

module.exports = { getAllObjects, getSingleObject };
