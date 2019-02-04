import {Post} from "../types"

type GotPosts = {
    type: "GotPosts",
    posts: Post[]
}

type NextPost = {
    type: "NextPost"
}

type PreviousPost = {
    type: "PreviousPost"
}

type ShowPost = {
    type: "ShowPost"
}

export type Action = GotPosts | NextPost | PreviousPost | ShowPost;