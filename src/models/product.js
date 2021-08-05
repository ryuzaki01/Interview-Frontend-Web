/* eslint-disable import/prefer-default-export */
import config from "config";

const productAPI = config.API.product;

const productList = `${productAPI}/frontend/web/question/one`;
const productSearch = `${productAPI}/frontend/web/question/two`;

export const getProductList = (client) => () => {
  return client(productList, {
    method: "GET"
  });
};

export const getProductSearch = (client) => () => {
  return client(productSearch, {
    method: "GET"
  });
};
