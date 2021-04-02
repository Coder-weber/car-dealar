import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGitHubSignIn,
  handleGoogleSingIn,
  handleSingOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./loginManager";
import firebase from "firebase/app";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import 'font-awesome/css/font-awesome.min.css';
import { Container } from "react-bootstrap";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photo: "",
  });

  initializeLoginFramework();

  const [loginInUser, setLoginInUser] = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSingIn = () => {
    handleGoogleSingIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const handleResponse = (res, redirect) => {
    setLoginInUser(res);
    setUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const signOut = () => {
    handleSingOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  const gitHubSignIn = () => {
    handleGitHubSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }

    e.preventDefault();
  };
  // event =e short version
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  return (
    <Container>
      {/* {user.isSignIn ? (
        <button onClick={signOut}>sign out</button>
      ) : (
        <button onClick={googleSingIn}>sign in</button>
      )} */}

        <button  class="bi bi-google"  onClick={googleSingIn}><i class="bi bi-google"></i>Sign In Google </button>



      <br />
      <button onClick={fbSignIn}>Sign in using Facebook</button>
      <button onClick={gitHubSignIn}>Sign in using Github </button>
      {user.isSignIn && (
        <div>
          <p>Welcome, {user.name} </p>
          <p>Your email: {user.email} </p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <h1>Your own Authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign In</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeholder="Your name"
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="your email address"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="your email password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <p style={{ color: "red" }}> {user.error} </p>
      {user.success && (
        <p style={{ color: "green" }}>
          user {newUser ? "created" : "Logged In"} successfully
        </p>
      )}
      </Container>
  );
}

export default Login;
