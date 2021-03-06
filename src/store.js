import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./component/reducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE_ || compose;
const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))

);

export default store;