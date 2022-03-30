import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./component/reducer";
import thunk from "redux-thunk";

const configureStore = () => {
	const middlewares = [thunk];
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const enhancers = composeEnhancers(applyMiddleware(...middlewares));
	const store = createStore(rootReducer(), enhancers);

	return store;
};

export default configureStore;
