import axios from "axios";

export async function getAllProduct ()  {
     return await axios.get("http://makeup-api.herokuapp.com/api/v1/products.json");
}


export const getFilteredProduct = (param) => {
    return axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?"+param);
};

export const getSearchedProduct = (param) => {
    return axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?"+param);
};
