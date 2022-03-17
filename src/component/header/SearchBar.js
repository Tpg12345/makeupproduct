/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { fetchSearchProduct } from "../reducer/CallProductAPIReducer";

const useStyles = makeStyles({

  searchbox: {
    borderRadius: "0px 20px 20px 0px"
  },
  searchdiv: {
    maxWidth: "1000px",
    marginBottom: "100px",
    marginLeft: "150px"
  },
  div1: {
    width: "100px",
    float: "left",

  },
  div2: {
    width: "900px",
   float:"right"
  },
  formControl: {
    minWidth: 120,
    borderRadius: "20px 0px 0px 20px"
  }
});

export default function SearchBar(props) {
  console.log("Search Bar Page Stated");
  const dispatch = useDispatch();
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
  const classes = useStyles();
  const [searchParam, setSearchParam] = useState("Brand");
  const inputChangeHandler = (event, value, reason) => {
    switch (reason) {
      case "input":
        setAutoCompleteOpen(!!value);
        break;
      case "reset":
      case "clear":
        setAutoCompleteOpen(false);
        break;
      default:
        console.log(reason);
    }
  };
  const onChangeHandler = (event, value) => {
    if (searchParam === "Brand") {
      sessionStorage.setItem("searchItem", value.brand);
    }else  if (searchParam === "Product Type") {
      sessionStorage.setItem("searchItem", value.product_type);
    }else if (searchParam === "Category") {
      sessionStorage.setItem("searchItem", value.category);
    }
    sessionStorage.setItem("searchParam",searchParam);
    dispatch(fetchSearchProduct);
  };

  const filterOptions = createFilterOptions({
    stringify: ({ product_type }) => `${product_type}`
  });

  const onChangeHandlerOption = (event) => {
    setSearchParam(event.target.value);
  };

  return (
    // <div className={classes.searchdiv}>
      <>
      {/* // <div className={classes.searchdiv}> */}
      <div className={classes.div1}>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            className={classes.formControl}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={searchParam}
            onChange={onChangeHandlerOption}
          >
            <MenuItem value={"Brand"} selected={true}>Brand</MenuItem>
            <MenuItem value={"Product Type"}>Product Type</MenuItem>
            <MenuItem value={"Category"}>Category</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.div2}>
        <Autocomplete
          freeSolo
          disableClearable={true}
          options={props.item.map((product) => product)}
          open={autoCompleteOpen}
          onChange={(event, value) => onChangeHandler(event, value)}
          onInputChange={(event, value, reason) => inputChangeHandler(event, value, reason)}
          filterOptions={filterOptions}
          getOptionLabel={({ product_type, category, brand }) => {
            // this is how our option will be displayed when selected
            // remove the `id` here
            if (searchParam === "Brand") {
              return { brand };
            } else if (searchParam === "Product Type") {
              return { product_type };
            } else if (searchParam === "Category") {
              return { category };
            }
          } }
          filterSelectedOptions
          renderOption={({ product_type, category, brand }) => {
            if (searchParam === "Brand" && brand !== "") {
              return (
                <div>
                  <div>
                    {brand}
                  </div>
                </div>
              );
            } else if (searchParam === "Product Type" && product_type !== "") {
              return (
                <div>
                  <div>
                    {product_type}
                  </div>
                </div>
              );
            } else if (searchParam === "Category" && category !== "") {
              return (
                <div>
                  <div>
                    {category}
                  </div>
                </div>
              );
            }
          } }
          renderInput={(params) => (
            <><TextField {...params}
              variant="outlined"
              InputProps={{ ...params.InputProps, type: "search", className: classes.searchbox }}></TextField></>
          )} />
      </div></>
    
  );
}

SearchBar.propTypes = {
  item: PropTypes.array
};