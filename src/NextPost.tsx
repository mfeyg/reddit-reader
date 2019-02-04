import { State } from "./store/reducer";
import { connect } from "react-redux"
import React from "react"

export default connect((state: State) => {
    const nextPost = state.posts[state.currentPost + 1];
    return {
        nextPost: nextPost && nextPost.previewUrl
    }
})(({nextPost} : {nextPost: string | undefined}) =>
    nextPost ? <img style={{display: "none"}} src={nextPost}/> : null)