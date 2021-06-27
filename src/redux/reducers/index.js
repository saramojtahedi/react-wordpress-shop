import { combineReducers } from "redux";
import { CartReducer } from "./Cart";
import { load } from "./loader";
import { login } from "./login";
import { role } from "./role";
import { tags } from "./tags";
import { users } from "./user";



const reducers = combineReducers({
    loader: load,
    login: login,
    role: role,
    tags: tags,
    users: users,
    cart : CartReducer
})

export default reducers;