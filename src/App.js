import React, { useEffect, useState } from "react";
import ConnectModal from "./components/ConnectModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getPosts, logout } from "./utils/firebase";
import CreatPost from "./components/CreatPost";
import Post from "./components/Post";
import { useDispatch, useSelector } from "react-redux";
import { getPostsReducer } from "./feature/post.slice";

const App = () => {
  const [user, setUser] = useState(null);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    getPosts().then((querySnapshot) =>
      dispatch(
        getPostsReducer(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      )
    );
  }, []);

  return (
    <div>
      <div className="app-header">
        {user && (
          <div className="user-infos">
            <span>{user.displayName[0]}</span>
            <h4>{user.displayName}</h4>
            <button onClick={logout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        )}
        {user ? (
          <CreatPost uid={user.uid} displayName={user.displayName} />
        ) : (
          <ConnectModal />
        )}
      </div>
      <div className="posts-container">
        {posts &&
          [...posts]
            .sort((postA, postB) => postB.date - postA.date)
            .map((post) => <Post post={post} key={post.id} user={user} />)}
      </div>
    </div>
  );
};

export default App;
