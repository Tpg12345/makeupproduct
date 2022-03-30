import actions from "./ProductAction";
import { getAllProduct, getFilteredProduct, getSearchedProduct }  from "../service/ProductService";

export const loadProducts = () =>
(dispatch)=> {
//   dispatch(actions.ProductsLoadStart());
    getAllProduct()
    .then((response)=>dispatch(actions.ProductsLoadSuccess(response.data, null)))
    .catch((error)=>dispatch(actions.ProductsLoadError(error.message)));
};

export const loadFilterProducts = () =>
 (dispatch)=>{
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
    getFilteredProduct(param)
    .then((response)=>dispatch(actions.ProductsLoadSuccess(response.data, "filter")))
    .catch((error)=>dispatch(actions.ProductsLoadError(error.message)));
};

export const loadSearchProducts = ()=> 
(dispatch)=>{
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
    getSearchedProduct(param)
    .then((response)=>dispatch(actions.ProductsLoadSuccess(response.data, "search")))
    .catch((error)=>dispatch(actions.ProductsLoadError(error.message)));
};