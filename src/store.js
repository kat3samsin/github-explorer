import { createStore, applyMiddleware } from "redux";
import projectReducers from "./reducers/projectsReducer";
import thunk from "redux-thunk";

const store = createStore(projectReducers, applyMiddleware(thunk));

export default store;