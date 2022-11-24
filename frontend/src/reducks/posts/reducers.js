import * as Actions from './actions';
import initialState from '../store/initialState';

export const PostsReducer = (state = initialState.posts, action) => {
    switch (action.type) {
        case Actions.FETCH_POST:
            return {
                list: [...action.payload.posts]
            };
        case Actions.ADD_POST:
            return {
                ...state,
                list: [action.payload.post, ...state.list]
            };
        case Actions.DELETE_POST:
            return {
                list: state.list.filter(result => result.id !== action.payload.postId)
            };
        default:
            return state;
    }
};
