import { Breadcrumbs, Link, Typography } from '@material-ui/core'
import React from 'react'

export const Navigation = (props) => {
    let filterCriteria='';
    if(sessionStorage.getItem('brand')){
        filterCriteria += 'Brand: '+sessionStorage.getItem('brand');
    }
    if(sessionStorage.getItem('tag')){
        filterCriteria += 'Tag: '+sessionStorage.getItem('tag');
    }
    if(sessionStorage.getItem('priceMin')){
        filterCriteria+= 'Price Range: '+sessionStorage.getItem('priceMin')+'-'+sessionStorage.getItem('priceMax');
    }
    
   if(props.resultType === 'search'){
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/">
                    Home
                </Link>
                <Typography color="textPrimary">  Search ! {sessionStorage.getItem('searchItem')}</Typography>
            </Breadcrumbs>
        </div>
    )
   }else if(props.resultType === 'filter'){
    return  (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/" >
                    Home
                </Link>
                <Typography color="textPrimary"> Filter ! {filterCriteria}</Typography>
            </Breadcrumbs>
        </div>
    )
   }else {
       return(
           <div></div>
       )
   }
}
