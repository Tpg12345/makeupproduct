import { render } from '@testing-library/react'
import React from 'react'
import { createMemoryHistory } from "history"
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Router } from 'react-router-dom';
import ProductIndex from '../component/product/ProductIndex'

jest.mock("react-redux");
const history = createMemoryHistory();
describe("ProductIndex", () => {
    test('when isloading true render loading', () => {
        useSelector.mockReturnValue({isLoading:true, products:null, errorMessage:null,searchfilter:null})
        // const dispatch = jest.fn();
useDispatch.mockReturnValue(jest.fn());
        render(
            <ProductIndex />
        )
    });

    test("when state have product data", () => {
        useSelector.mockReturnValue({isLoading:false, products:["abc"], errorMessage:null,searchfilter:null});
        useDispatch.mockReturnValue(jest.fn());
        history.push("/");
        render(
            <BrowserRouter>
                <ProductIndex />
            </BrowserRouter>
        );
    });

//     test("when state have no product data", () => {
//         useSelector.mockReturnValue({isLoading:false, products:null, errorMessage:null,searchfilter:null});
//         render(
//             <ProductIndex />
//         )
//     })
})