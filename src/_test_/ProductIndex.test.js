import { render } from '@testing-library/react'
import React from 'react'
import { createMemoryHistory } from "history"
import { useSelector } from 'react-redux'
import { BrowserRouter, Router } from 'react-router-dom';
import ProductIndex from '../component/product/ProductIndex'

jest.mock("react-redux");
const history = createMemoryHistory();
describe("ProductIndex", () => {
    test('when state.length is 0 render loading', () => {
        useSelector.mockReturnValue([])
        render(
            <ProductIndex />
        )
    });

    test("when state have product data", () => {
        useSelector.mockReturnValue([["abc"], false]);
        history.push("/");
        render(
            <BrowserRouter>
                <ProductIndex />
            </BrowserRouter>
        );
    });

    test("when state have no product data", () => {
        useSelector.mockReturnValue([[]]);
        render(
            <ProductIndex />
        )
    })
})