const yup = require("yup");

const url = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const phone = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const onlyAlpha = /^[A-Za-z ]*$/;

const restaurantValidation = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  number: yup.string().required().matches(url, "Restaurant url is not valid"),
  imageUrl: yup.string().required().matches(url, "Image url is not valid"),
});

module.exports = { restaurantValidation };
