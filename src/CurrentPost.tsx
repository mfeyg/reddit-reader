import { Post } from "./types";
import { State } from "./store/reducer";
import { connect } from "react-redux";
import React from 'react';
import { Dispatch } from "redux";
import { Action } from "./store/actions";

interface Props {
    post: Post | null;
    nextPost: () => void;
    previousPost: () => void;
    showPost: () => void;
}

const CurrentPost = ({post, nextPost, previousPost, showPost}: Props) => (
    <div tabIndex={0}
        onKeyDown={event => {
            switch (event.key) {
            case "ArrowRight":
            case "j":
            case "d":
                nextPost();
                break;
            case "ArrowLeft":
            case "k":
            case "a":
                previousPost();
                break;
            case " ":
                showPost();
                break;
            }
        }}>
        {post && <>
            {post.previewUrl &&
                <img style={{maxHeight: '80vh', maxWidth: '100vw'}}
                     src={post.previewUrl} />}
            <h1>{post.title}</h1>
        </>}
    </div>
)

const mapStateToProps = (state: State) => ({
    post: state.posts[state.currentPost] || null
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    nextPost() {
        dispatch({type: "NextPost"})
    },
    previousPost() {
        dispatch({type: "PreviousPost"})
    },
    showPost() {
        dispatch({type: "ShowPost"})
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPost)