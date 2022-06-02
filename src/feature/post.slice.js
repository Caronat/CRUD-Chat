import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: null,
  },
  reducers: {
    getPostsReducer: (state, { payload }) => {
      state.posts = payload;
    },
    addPostReducer: (state, { payload }) => {
      state.posts.push(payload);
    },
    editPostReducer: (state, { payload }) => {
      const { id, newMessage } = payload;
      state.posts = state.posts.map((post) => {
        if (post.id === id) {
          return { ...post, message: newMessage };
        }
        return post;
      });
    },
    deletePostReducer: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post.id !== payload);
    },
    updateCommentReducer: (state, { payload }) => {
      const { id, comments } = payload;
      state.posts = state.posts.map((post) => {
        if (post.id === id) {
          return { ...post, comments: comments };
        }
        return post;
      });
    },
  },
});

export const {
  getPostsReducer,
  addPostReducer,
  deletePostReducer,
  editPostReducer,
  updateCommentReducer,
} = postSlice.actions;
export default postSlice.reducer;
