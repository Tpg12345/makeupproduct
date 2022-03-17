import { render } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ProductList } from '../component/product/ProductList'

describe("Test productList", () => {
    test('should first', () => {
        render(
            <BrowserRouter>
            <ProductList currProdPage={["abc","adfdd"]} />
            </BrowserRouter>
        )
    })
})