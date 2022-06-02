import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateCommentReducer } from "../feature/post.slice";
import { updateComment } from "../utils/firebase";
import { uid } from "../utils/uid";
import CommentCard from "./CommentCard";

const CommentPost = ({ post, user }) => {
  const commentText = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const commentId = uid();
    const oldCommentsData = post.comments || [];
    const newCommentsData = [
      ...oldCommentsData,
      {
        commentId: commentId,
        authorId: user.uid,
        author: user.displayName,
        text: commentText.current.value,
      },
    ];

    updateComment(post.id, newCommentsData).then(() => {
      dispatch(
        updateCommentReducer({ id: post.id, comments: newCommentsData })
      );
      commentText.current.value = "";
    });
  };

  return (
    <div className="comment-container">
      <h5>Commentaires</h5>

      {post.comments?.map((comment, i) => (
        <CommentCard key={comment.commentId} comment={comment} post={post} />
      ))}

      {user ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <textarea
            placeholder="Ajouter un commentaire"
            ref={commentText}
          ></textarea>
          <input type="submit" value="Envoyer" />
        </form>
      ) : (
        <p>Vous devez être connecté pour ajouter un commentaire</p>
      )}
    </div>
  );
};

export default CommentPost;
