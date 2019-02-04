import { Store, createStore, applyMiddleware } from "redux";
import reducer, { State } from "./reducer";
import { Action } from "./actions";
import middleware from "./middleware"

const store: Store<State, Action> =
    createStore(reducer, applyMiddleware(middleware));

export default store;