import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Navigation } from '../component/header/Navigation'

describe("Navigation", ()=>{
    test('when resultType is Search', () => { 
        render(
            <Navigation resultType='search'/>
        )
    });

    test('when resultType is filter', () => { 
        render(
            <Navigation resultType='filter'/>
        )
        fireEvent.click(screen.getByText('Home'),{button:0})
    });

});