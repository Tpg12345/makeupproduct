import React, { useState } from "react";
import clsx from "clsx";
import { Paginations } from "./Pagination";
import { ProductList } from "./ProductList";
import { Header } from "../header/Header";
import SearchBar from "../header/SearchBar";
import { ApplyFilter } from "../left/ApplyFilter";
import { useSelector } from "react-redux";
import { AppBar, Container, CssBaseline, Divider, Drawer, Grid, IconButton, List, makeStyles, Paper, Toolbar, Typography } from "@material-ui/core";
import { Navigation } from "../header/Navigation";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		paddingTop: "10px",
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 240,
	},
}));

const ProductIndex = () => {
	const state = useSelector((state) => state.CallProductAPIReducer);
	console.log(state, "call api state");
	const [currPage, setCurrPage] = useState(1);
	const productPerPage = 40;
	let currProdPage = 0;
	let totalPage = 0;
	if (state.length !== 0 && state[1] === false) {

		const indexOfLastProd = currPage * productPerPage;
		const indexofFirstProd = indexOfLastProd - productPerPage;
		currProdPage = state[0].slice(indexofFirstProd, indexOfLastProd);
		totalPage = state[0].length / productPerPage;
	}

	const showProductDetail = (event, index) => {
		// event.preventDefault();
		sessionStorage.setItem("productDetail", JSON.stringify(currProdPage[index]));
		console.log(JSON.parse(sessionStorage.productDetail));
	};

	const paginate = (event, page) => {
		setCurrPage(page);
	};

	const classes = useStyles();
	const [open, setOpen] = useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	// const fixedHeightPaper = clsx(classes.paper);
	if (state.length === 0) {
		return (
			<div>Loading.....</div>
		);
	} else if (state[1] === false && state[0].length !== 0) {
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
					<Toolbar className={classes.toolbar}>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
						>
							<MenuIcon />
						</IconButton>
						<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
							Find Make Up Product
						</Typography>
						{/* <IconButton color="inherit">
				  <Badge badgeContent={4} color="secondary">
					<NotificationsIcon />
				  </Badge>
				</IconButton> */}
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					classes={{
						paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
					}}
					open={open}
				>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>
						{/* <MainListItems /> */}
						<ApplyFilter/>
					</List>
					<Divider />
					{/* <List>{secondaryListItems}</List> */}
				</Drawer>
				<main className={classes.content}>
					<div className={classes.appBarSpacer} />
					<Container maxWidth="lg" className={classes.container}>
						<Grid container spacing={3}>
							<Grid item  xs={12} >
								<Navigation/>
							</Grid>
							<Grid item xs={10}>
								<SearchBar item={state[0]} />
							</Grid>
							<Grid item xs={12} md={8} lg={9}>
								<Paper className={classes.fixedHeightPaper} >
									<ProductList currProdPage={currProdPage} item={state[0]} showProductDetail={showProductDetail} />
									{/* <ProductList  showProductDetail={showProductDetail} /> */}
								</Paper>
							</Grid>
							<Grid item xs={12}>
							<Paginations totalPage={totalPage} page={currPage} paginate={paginate} />
							</Grid>
						</Grid>
						{/* <Box pt={4}>
				  <Copyright />
				</Box> */}
					</Container>
				</main>
			</div>

		);
	} else if (state[0].length === 0) {

		return (
			<Container maxWidth='lg'>
				<Header />
				<div style={{ textAlign: "center" }} >No Product</div>
			</Container>
		);
	}
};

export default ProductIndex;
