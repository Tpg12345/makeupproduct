/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { FormControl, Grid, makeStyles, MenuItem, Select } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { loadSearchProducts } from "../reducer/ProductThunk";
import ProductInfo from "../productConst/ProductInfo.json";

const useStyles = makeStyles({

  selectsearchop: {
    flexBasis: 0,
  },
  searchbox: {
    borderRadius: "0px 20px 20px 0px",
    width: "1100px"
  },
  formControl: {
    minWidth: 120,
    borderRadius: "20px 0px 0px 20px"
  },

});

export default function SearchBar() {
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
    sessionStorage.setItem("searchItem", value);
    sessionStorage.setItem("searchParam", searchParam);
    dispatch(loadSearchProducts());
  };

  const filterOptions = createFilterOptions({
    // stringify: ({ product_type }) => `${product_type}`
  });

  const onChangeHandlerOption = (event) => {
    setSearchParam(event.target.value);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={2} className={classes.selectsearchop} >
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              className={classes.formControl}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={searchParam}
              onChange={onChangeHandlerOption}
            >
              <MenuItem value={"Brand"} selected={true}>Brand</MenuItem>
              <MenuItem value={"ProductType"}>Product Type</MenuItem>
              <MenuItem value={"Category"}>Category</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10} className={classes.selectsearchop}  >
          <Autocomplete
            freeSolo
            disableClearable={true}
            options={ProductInfo[searchParam].map((product) => product)}
            open={autoCompleteOpen}
            onChange={(event, value) => onChangeHandler(event, value)}
            onInputChange={(event, value, reason) => inputChangeHandler(event, value, reason)}
            filterOptions={filterOptions}
            getOptionLabel={(product) => {
              // this is how our option will be displayed when selected
              // remove the `id` here
              return product;
            }}
            filterSelectedOptions
            renderOption={(product) => {
              if(product !== "" ){
              return (
                    <div>
                      <div>
                        {product}
                      </div>
                    </div>
                  );
              }else{
                return;
              }
              }
            }
            renderInput={(params) => (
              <><TextField {...params}
                variant="outlined"
                InputProps={{ ...params.InputProps, type: "search", className: classes.searchbox }}></TextField></>
            )} />
        </Grid>
      </Grid>
    </>

  );
}

SearchBar.propTypes = {
  item: PropTypes.array
};