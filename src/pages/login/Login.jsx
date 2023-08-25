import "./Login.scss";
import React, { useState } from "react";
import { useAuth } from "../../context/authContext.js";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { userId, token, isAuth, dispatchAuth } = useAuth();
  console.log(userId, token, isAuth);

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevState) => ({ ...prevState, [name]: value }));
  };

  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [haveAccount, setHaveAccount] = useState(false);

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        email: signInData.email,
        password: signInData.password,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating not authenticate you!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        dispatchAuth({
          type: "LOGIN",
          token: resData.token,
          userId: resData.userId,
          isAuth: true,
        });
        localStorage.setItem("isAuth", true);
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/auth/signup", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        email: signUpData.email,
        password: signUpData.password,
        name: signUpData.name,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }
        return res.json();
      })
      .then((resData) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <div className="sign-in-sign-up-container">
          {haveAccount && (
            <div className="sign-in">
              <h2>Sign In</h2>
              <form onSubmit={handleSignInSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signInData.email}
                  onChange={handleSignInChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signInData.password}
                  onChange={handleSignInChange}
                />
                <button type="submit">Sign In</button>
                <span class="switchText">
                  Don't Have An Account ?{" "}
                  <span onClick={() => setHaveAccount(false)}>Create</span>
                </span>
              </form>
            </div>
          )}
          {!haveAccount && (
            <div className="sign-up">
              <h2>Sign Up</h2>
              <form onSubmit={handleSignUpSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={signUpData.name}
                  onChange={handleSignUpChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                />
                <button type="submit">Sign Up</button>
                <span class="switchText">
                  Already Have An Account ?
                  <span onClick={() => setHaveAccount(true)}>Sign In</span>
                </span>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
