import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addPostReducer } from "../feature/post.slice";
import { addPost } from "../utils/firebase";

const CreatPost = ({ uid, displayName }) => {
  const message = useRef();
  const dispatch = useDispatch();

  const handlePost = async (e) => {
    e.preventDefault();

    const data = {
      author: displayName,
      authorId: uid,
      message: message.current.value,
      comments: null,
      date: Date.now(),
    };

    addPost(data).then((docRef) => {
      message.current.value = "";
      dispatch(addPostReducer({ ...data, id: docRef.id }));
    });
  };

  return (
    <div className="new-post-modal">
      <form onSubmit={(e) => handlePost(e)}>
        <textarea placeholder="Message..." ref={message}></textarea>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default CreatPost;
