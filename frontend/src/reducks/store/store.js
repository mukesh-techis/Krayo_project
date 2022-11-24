import { legacy_createStore as reduxCreateStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router'; 
import {composeWithDevTools} from 'redux-devtools-extension'
import { PostsReducer } from '../posts/reducers';
import { UserReducer } from '../users/reducers';


export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            posts: PostsReducer,
            users: UserReducer,

        }),
                composeWithDevTools(
            applyMiddleware(thunk)
            // DEBUG MODE
            // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )

    );
}
