import React, { useRef } from "react";
import { signupUser, updateUserDisplayName } from "../utils/firebase";

const SignUp = () => {
  const registerPseudo = useRef();
  const registerEmail = useRef();
  const registerPassword = useRef();

  const handleRegister = (e) => {
    e.preventDefault();

    const pseudo = registerPseudo.current.value;
    const email = registerEmail.current.value;
    const password = registerPassword.current.value;

    signupUser(email, password)
      .then(() => {
        updateUserDisplayName(pseudo);
        window.location.reload();
      })
      .catch((err) => console.table(err));
  };

  return (
    <div className="signup-container">
      <div className="signup">
        <h3>S'inscrire</h3>
        <form onSubmit={(e) => handleRegister(e)}>
          <input
            type="text"
            placeholder="Pseudo"
            required
            ref={registerPseudo}
          />
          <input
            type="email"
            placeholder="Email"
            required
            ref={registerEmail}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            required
            ref={registerPassword}
          />
          <input type="submit" value="Valider inscription" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
