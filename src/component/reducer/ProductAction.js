import actionTypes from "./ProductActionType";

const ProductsLoadStart = () => ({
	type: actionTypes.PRODUCTS_LOAD_START,
});

const ProductsLoadSuccess = (products, searchfilter) => ({
	type: actionTypes.PRODUCTS_LOAD_SUCCESS,
	payload: products,
	searchfilter: searchfilter,
});

const ProductsLoadError = (errorMessage) => ({
	type: actionTypes.PRODUCTS_LOAD_ERROR,
	payload: errorMessage,
});


export default {
	ProductsLoadStart,
	ProductsLoadSuccess,
    ProductsLoadError,
};