import {Action} from './actions';
import {Post} from "../types";

export interface State {
    posts: (Post | undefined)[];
    currentPost: number;
}

const defaultState: State = {
    posts: [],
    currentPost: 0
}

const isDefined = <T>(value: T | undefined): value is T => value !== undefined;

export default (state: State = defaultState, action: Action) => {
    switch (action.type) {
        case "GotPosts":
            const allPosts = state.posts.concat(action.posts).filter(isDefined);
            const postNames = [...new Set(allPosts.map(post => post.name))];
            const postsByName = allPosts.reduce<{[name: string]: Post | undefined}>(
                (byName, post) => ({...byName, [post.name]: post}), {}
            );
            return {
                ...state,
                posts: postNames.map(name => postsByName[name])
            }
        case "NextPost":
            return {
                ...state,
                currentPost: state.currentPost + 1
            }
        case "PreviousPost":
            return {
                ...state,
                currentPost: state.currentPost && state.currentPost - 1
            }
        default:
            return state;
    }
};