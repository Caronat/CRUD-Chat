import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editPostReducer } from "../feature/post.slice";
import useBoolean from "../hooks/useBoolean";
import dateFormater from "../utils/dateFormater";
import { editPost } from "../utils/firebase";
import CommentPost from "./CommentPost";
import DeletePost from "./DeletePost";

const Post = ({ post, user }) => {
  const [edit, setEdit] = useBoolean(false);
  const [newMessage, setNewMessage] = useState(null);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEdit.off();
    if (newMessage) {
      editPost(post.id, newMessage).then(() => {
        dispatch(editPostReducer({ id: post.id, newMessage: newMessage }));
      });
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="left-part">
          <div className="title">
            <span>{post.author[0]}</span>
            <h2>{post.author}</h2>
          </div>
          <h5>Posté {dateFormater(post.date)}</h5>
        </div>
        {post.authorId === user?.uid && (
          <div className="right-part">
            <span onClick={() => setEdit.toggle()}>
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <DeletePost postId={post.id} />
          </div>
        )}
      </div>
      {edit ? (
        <>
          <textarea
            autoFocus
            value={newMessage || post.message}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button className="edit-btn" onClick={handleEdit}>
            Modifier le message
          </button>
        </>
      ) : (
        <p>{post.message}</p>
      )}
      <CommentPost post={post} user={user} />
    </div>
  );
};

export default Post;
