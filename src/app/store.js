import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../feature/post.slice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
