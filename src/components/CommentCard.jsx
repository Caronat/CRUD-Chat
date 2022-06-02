import React from "react";
import { useDispatch } from "react-redux";
import { updateCommentReducer } from "../feature/post.slice";
import { updateComment, auth } from "../utils/firebase";

const CommentCard = ({ comment, post }) => {
  const { author, commentId, text, authorId } = comment;

  const dispatch = useDispatch();

  const handleDelete = () => {
    const newCommentsData = post.comments.filter(
      (comment) => comment.commentId !== commentId
    );

    updateComment(post.id, newCommentsData).then(() => {
      dispatch(
        updateCommentReducer({ id: post.id, comments: newCommentsData })
      );
    });
  };

  return (
    <div className="comment-post">
      <h5>{author}</h5>
      <p>{text}</p>
      {authorId === auth.currentUser?.uid && (
        <span className="delete" onClick={handleDelete}>
          <i className="fa-solid fa-trash-can"></i>
        </span>
      )}
    </div>
  );
};

export default CommentCard;
