import React, { useRef, useState } from "react";
import { login } from "../utils/firebase";

const Login = () => {
  const loginEmail = useRef();
  const loginPassword = useRef();

  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const email = loginEmail.current.value;
    const password = loginPassword.current.value;

    login(email, password)
      .then(() => setError(false))
      .catch((err) => setError(true));
  };

  return (
    <div className="login-container">
      <div className="login">
        <h3>Se connecter</h3>
        <form onSubmit={(e) => handleLogin(e)}>
          <input type="email" placeholder="Email" required ref={loginEmail} />
          <input
            type="password"
            placeholder="Mot de passe"
            required
            ref={loginPassword}
          />
          <span>{error && "Le mail ou le mot de passe est incorrect"}</span>
          <input type="submit" value="Se connecter" />
        </form>
      </div>
    </div>
  );
};

export default Login;
