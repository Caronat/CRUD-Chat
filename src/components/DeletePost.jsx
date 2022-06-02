import React from "react";
import { useDispatch } from "react-redux";
import { deletePostReducer } from "../feature/post.slice";
import { deletePost } from "../utils/firebase";

const DeletePost = ({ postId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    deletePost(postId).then(() => {
      dispatch(deletePostReducer(postId));
    });
  };

  return (
    <span className="delete" onClick={handleDelete}>
      <i className="fa-solid fa-trash-can"></i>
    </span>
  );
};

export default DeletePost;
