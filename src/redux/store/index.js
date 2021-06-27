import { applyMiddleware, compose, createStore } from "redux";
import thunk from 'redux-thunk'
import reducers from "../reducers/index";

const cartItemsLocal = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : []

const initialState = {
    cart: { cartItems : cartItemsLocal}
}

 const store = createStore(
     reducers,
     initialState,
     compose (
        applyMiddleware(thunk)
     )
 )

 store.subscribe(() => console.log(store.getState()))

 export default store