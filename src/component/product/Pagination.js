import React from "react";
import PropTypes from "prop-types";
import Pagination from "@material-ui/lab/Pagination";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    paginate: {
        marginTop: "10px",
        marginBottom: "20px",
        width: "100%",
        float: "right"
    }
});

export const Paginations = (props) => {
    const classes = useStyles();
    let totalPage = Math.floor(props.totalPage);
    console.log(totalPage, "total page");
    if (totalPage > 1) {
        return (
            <Grid container className={classes.paginate} spacing={12} >
            <Grid   item xs={12} >
                <Pagination count={totalPage} page={props.currPage} color="primary" variant="outlined" onChange={props.paginate} />
            </Grid>
            </Grid>
        );
    } else {
        return (
            <div></div>
        );
    }
};

Paginations.propTypes = {
    totalPage: PropTypes.number,
    currPage: PropTypes.number,
    paginate: PropTypes.func
};
