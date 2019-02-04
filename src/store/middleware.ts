import { MiddlewareAPI, Dispatch } from "redux";
import { Action } from "./actions";
import { State } from "./reducer";
import { Post } from "../types";
import hot from "../client/hot";

export default (store: MiddlewareAPI<Dispatch<Action>, State>) =>
    (next: Dispatch<Action>) => {
        const fetchMore = (posts: (Post | undefined)[]) => {
            const lastPost = posts[posts.length - 1];
            const after = lastPost && lastPost.name;
            hot(after)(posts => store.dispatch({
                type: "GotPosts", posts
            }))
        }
        fetchMore(store.getState().posts)
        return (action: Action) => {
            next(action);
            const state = store.getState();
            if ((action.type !== "GotPosts") &&
                (!state.posts[state.currentPost] || !state.posts[state.currentPost + 1])) {
                fetchMore(state.posts);
            }
            const currentPost = state.posts[state.currentPost];
            if (action.type === "ShowPost" && currentPost) {
                window.open("https://www.reddit.com" + currentPost.link, "_blank");
            }
        }
    }