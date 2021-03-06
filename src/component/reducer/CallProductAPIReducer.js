import axios from "axios";


const initialState = [];
export const CallProductAPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CallProductAPI": {
      console.log(action.payload);
      return [...state, action.payload, action.isLoading];
    }
    case "LoadProduct": {
      return state;
    }
    case "Applyfilter": {
      return [action.payload, action.isLoading, action.searchorfilter];
    }
    case "SearchItem": {
      return [action.payload, action.isLoading, action.searchorfilter];
    }
    default:
      return state;
  }
};

export async function fetchProduct(dispatch, getState) {
  console.log(getState);
  const response = await axios.get("http://makeup-api.herokuapp.com/api/v1/products.json");
  dispatch({ type: "CallProductAPI", payload: response.data, isLoading: false });
}

// export const fetchProduct = () => {
//    return async (dispatch,getState) => {
//     console.log(getState);
//     function onSuccess(data){
//       dispatch({ type: "CallProductAPI", payload: data, isLoading: false });
//     }
//     function onError(error){
//       dispatch({type:"Error",payload:error});
//     }
//   try {
//     const data = await axios.get("http://makeup-api.herokuapp.com/api/v1/products.json");
//     return onSuccess(data);
//   } catch (error) {
//      return onError(error) ;
//   }
// };
// };
export async function fetchFilterProduct(dispatch) {
  let brand = sessionStorage.getItem("brand");
  let tag = sessionStorage.getItem("tag");
  let priceMin = sessionStorage.getItem("priceMin");
  let priceMax = sessionStorage.getItem("priceMax");
  let rating = sessionStorage.getItem("rating");
  let param = "";
  if (brand !== "" && brand !== null) {
    param += "brand=" + brand.trim();
  } if (tag !== "" && tag !== null) {
    param += "&tag_list=" + tag.trim();
  } if (priceMin !== "" && priceMin !== null && priceMax !== "" && priceMax !== null) {
    param += "&price_greater_than=" + priceMin + "&price_less_than=" + priceMax;
  }
  if (rating !== "" && rating !== null) {
    param += "&rating_greater_than=" + 0 + "&rating_less_than=" + rating;
  }
  const response = await axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?" + param);
  dispatch({ type: "Applyfilter", payload: response.data, isLoading: false, searchorfilter: "filter" });
}
export async function fetchSearchProduct(dispatch, value) {
  console.log(value);
  let sarchItem = sessionStorage.searchItem;
  let searchParam = sessionStorage.searchParam;
  let param = "";
  if ((sarchItem !== "" || sarchItem !== null) && searchParam === "Brand") {
    param += "brand=" + sarchItem.trim();
  } if ((sarchItem !== "" || sarchItem !== null) && searchParam === "Category") {
    param += "category=" + sarchItem.trim();
  } if ((sarchItem !== "" || sarchItem !== null) && searchParam === "ProductType") {
    param += "product_type=" + sarchItem.trim();
  }
  const response = await axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?" + param);
  dispatch({ type: "SearchItem", payload: response.data, isLoading: false, searchorfilter: "search" });
}