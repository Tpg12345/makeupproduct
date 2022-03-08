import React, { useState } from "react";
import { Paginations } from "./Pagination";
import { ProductList } from "./ProductList";
import { Header } from "../header/Header";
import SearchBar from "../header/SearchBar";
import { ApplyFilter } from "../left/ApplyFilter";
import { useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import { Navigation } from "../header/Navigation";


const ProductIndex = () => {
	const state = useSelector((state) => state.CallProductAPIReducer)
	console.log(state, "call api state");
	const [currPage, setCurrPage] = useState(1);
	const [productPerPage, setproductPerPage] = useState(40);
	let currProdPage;
	let totalPage;
	if (state.length !== 0 && state[1] === false) {

		const indexOfLastProd = currPage * productPerPage;
		const indexofFirstProd = indexOfLastProd - productPerPage;
		currProdPage = state[0].slice(indexofFirstProd, indexOfLastProd)
		totalPage = state[0].length / productPerPage;
	}

	const showProductDetail = (event, index) => {
		// event.preventDefault();
		sessionStorage.setItem('productDetail', JSON.stringify(currProdPage[index]));
		console.log(JSON.parse(sessionStorage.productDetail));
	}

	const paginate = (event, page) => {
		setCurrPage(page);
	}
	if (state.length === 0) {
		return (
			<div>Loading.....</div>
		)
	} else if (state[1] === false && state[0].length !== 0) {
		return (
			<>
				<Container maxWidth='lg'>
					<Header />
					<Navigation resultType={state[2]} />
					<SearchBar item={state[0]} />
					<ApplyFilter />
					<ProductList currProdPage={currProdPage} item={state[0]} showProductDetail={showProductDetail} />
					<Paginations totalPage={totalPage} page={currPage} paginate={paginate} />
				</Container>
			</>
		);
	} else if (state[0].length === 0) {

		return (
			<Container maxWidth='lg'>
				<Header />
				<div style={{ textAlign: 'center' }} >No Product</div>
			</Container>
		)
	}
}

export default ProductIndex;
