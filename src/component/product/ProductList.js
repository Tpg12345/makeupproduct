
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Grid, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 240,
    },
    searchBar: {
        marginBottom: 10,
        width: "100%"
    },
    div: {

        // float: 'right',
    }
});

export const ProductList = (props) => {
    const classes = useStyles();
    return (
        <>
            <Grid container spacing={2} xs={12}>
                {props.currProdPage.map((item, index) => (
                    <Grid item key={index} xs={3}>
                        <Card className={classes.root}>
                            <Link underline='none' component={RouterLink} to="/productDetails" onClick={(event) => props.showProductDetail(event, index)} >
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        alt='No Image'
                                        image={item.image_link}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            Brand: {item.brand}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            Price: {item.price_sign}{item.price}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid>

                )

                )}
            </Grid>
        </>
    );
};

ProductList.propTypes = {
    currProdPage: PropTypes.array,
    showProductDetail: PropTypes.func
};