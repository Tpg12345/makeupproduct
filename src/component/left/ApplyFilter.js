import { Accordion, AccordionDetails, AccordionSummary, Button, FormControlLabel, FormGroup,ListItem,ListItemIcon, ListItemText, makeStyles, Radio, RadioGroup, TextField, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React, { useState } from "react";
import ProductInfo from "../productConst/ProductInfo.json";
import { useDispatch } from "react-redux";
import { fetchFilterProduct } from "../reducer/CallProductAPIReducer";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/AttachMoney";
import Star from "@material-ui/icons/Star";
const useStyles = makeStyles({

  filterdiv: {
    float: "left",
    width: "270px",
  },
  priceMin: {
    width: "100px"
  },
  priceMax: {
    width: "100px",
    marginLeft: "20px"
  },
  filtergrid: {
    flexGrow: 1,
  },
  applybutton: {
    marginTop: "10px"
  },
  padding:{
    paddingTop:"0px",
    paddingBottom:"0px",
  },
  accordiondetail:{
    paddingTop:"0px",
  }

});
export const ApplyFilter = () => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState("");
  const [Tag, setTag] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };
  const handleTagChange = (event) => {
    setTag(event.target.value);
  };
 
  const handleApplyFliter = () => {
    let brandVal = "";
    let tagVal = "";
    var brand = document.querySelectorAll("input[name=\"brand\"]:checked");
    var tag = document.querySelectorAll("input[name=\"tag\"]:checked");
    var priceMin = document.querySelector("input[name=\"pricemin\"]");
    var priceMax = document.querySelector("input[name=\"pricemax\"]");
    if (brand.length !== 0) {
      for (let i = 0; i < brand.length; i++) {
        brandVal += brand[i].value;
      }
      sessionStorage.setItem("brand", brandVal);
    }else if(sessionStorage.getItem("brand")){
      sessionStorage.removeItem("brand");
    } if (tag.length !== 0) {
      for (let i = 0; i < tag.length; i++) {
        tagVal += tag[i].value;
      }
      sessionStorage.setItem("tag", tagVal);
    }else if(sessionStorage.getItem("tag")){
      sessionStorage.removeItem("tag");
    } if (priceMin.value !== "") {
      sessionStorage.setItem("priceMin", priceMin.value);
    } else if(sessionStorage.getItem("priceMin")){
      sessionStorage.removeItem("priceMin");
    } if(priceMax.value !== ""){
      sessionStorage.setItem("priceMax", priceMax.value);
    }else if(sessionStorage.getItem("priceMax")){
      sessionStorage.removeItem("priceMax");
    }
     if (value !== 0) {
      sessionStorage.setItem("rating", value);
    }
    dispatch(fetchFilterProduct);
  };
  console.log("Apply Filter before return");
  return (
    <div >
    {/* //   <Grid className={classes.filtergrid}> */}
        <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <ListItem className={classes.padding}>
          <AccordionSummary
            
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            {/* <ListItem> */}
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            {/* </ListItem> */}
            <ListItemText primary="Brand" />
          </AccordionSummary>
          </ListItem>
          <AccordionDetails className={classes.accordiondetail}>
              <FormGroup>
                <RadioGroup name="brand" value={brand} onChange={handleBrandChange}>
                  {ProductInfo.Brand.map((brand, index) => (
                    <FormControlLabel key={index} control={<Radio name='brand' value={brand} />} label={brand} />
                  ))}
                </RadioGroup>
              </FormGroup>
          </AccordionDetails>
        </Accordion>
       
        <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
        <ListItem className={classes.padding}>
          <AccordionSummary
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Tag" />
          </AccordionSummary>
          </ListItem>
          <AccordionDetails className={classes.accordiondetail}>
            <Typography>
              <FormGroup>
                <RadioGroup name="brand" value={Tag} onChange={handleTagChange}>
                  {ProductInfo.Tag.map((Tag, index) => (
                    <FormControlLabel key={index} control={<Radio name='tag' value={Tag} />} label={Tag} />
                  ))}
                </RadioGroup>
              </FormGroup>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
        <ListItem className={classes.padding}>
          <AccordionSummary
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
           <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Price Rang" />
          </AccordionSummary>
          </ListItem>
          <AccordionDetails>
              <TextField className={classes.priceMin} type='number' name='pricemin' id="outlined-basic" label="Min Price" size="small" variant="outlined" />
              <TextField className={classes.priceMax} type='number' name='pricemax' id="outlined-basic" label="Max Price" size="small" variant="outlined" />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
        <ListItem className={classes.padding}>
          <AccordionSummary
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
          <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText primary="Rating" />
          </AccordionSummary>
          </ListItem>
          <AccordionDetails>
              <Rating name="rating" value={value} onChange={(event, newValue) => {
                console.log(value,"previous number");
            setValue(newValue);
            console.log(newValue);
          }}
                
             />
          </AccordionDetails>
        </Accordion>
        <ListItem className={classes.padding}>
          <Button className={classes.applybutton} variant="contained" onClick={handleApplyFliter} color="primary">
            Apply Filter
          </Button>
        </ListItem>
    </div>
  );
};
