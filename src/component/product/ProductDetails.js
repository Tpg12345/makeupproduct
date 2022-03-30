import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {

  },
  media: {
    width: "500px",
    height: "400px",
    marginLeft: "5px"
  },
  title: {
    textAlign: "center"
  },
  circle: {
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    display: "inline-block",
  }

});
export const ProductDetails = () => {
  const classes = useStyles();
  let product = JSON.parse(sessionStorage.productDetail);
  console.log(product);

  return (
    <Container>
      <Card className={classes.root}  >
        <CardHeader className={classes.title} title={product.name} />
        <CardMedia
          className={classes.media}
          image={product.image_link}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <b> {product.name}</b>
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            <b>Price: </b> {product.price_sign}{product.price}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            <b> Brand:</b> {product.brand}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            <b> Category:</b> {product.category}
          </Typography>
          <CardActions>
            <Button href={product.product_link} variant="contained" color="primary">
              Buy Now
            </Button>
          </CardActions>
          <Typography gutterBottom variant="h6" component="div">
            <b> Color Option:</b>
          </Typography>
          <Grid container >
            {product.product_colors.map((productcolor, index) => (
              <Grid key={index} item xs={2}>
                <Typography className={classes.circle} style={{ background: productcolor.hex_value }} gutterBottom variant="h6" component="div">
                  .
                </Typography><span> {productcolor.colour_name} </span>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" color="textPrimary" component="div">
            <b>Discription: </b>{product.description}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="div">
            <b> Tag: </b>{product.tag_list.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
