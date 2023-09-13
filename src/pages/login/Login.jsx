import "./Login.scss";
import React, { useState } from "react";
import { useAuth } from "../../context/authContext.js";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Swal from "sweetalert2";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { userId, token, isAuth, dispatchAuth } = useAuth();

  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState(isAuth);

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    fetch(`${BACKEND_URL}/auth/login`, {
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
        dispatchAuth({
          type: "LOGIN",
          token: resData.token,
          userId: resData.userId,
          isAuth: true,
        });
        localStorage.setItem("isAuth", true);
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        navigate("/societies");
      })
      .catch((err) => {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Incorrect Email Id or Password.',
          showConfirmButton: true
        });
      });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    fetch(`${BACKEND_URL}/auth/signup`, {
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
      .then((resData) => {
        setIsSignUp(false);
      })
      .catch((err) => {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Something Went Wrong!!',
          showConfirmButton: true
        });
      });
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <div className="sign-in-sign-up-container">
          {!isSignUp && (
            <div className="sign-in">
              <h2>Sign In</h2>
              <form onSubmit={handleSignInSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={signInData.email}
                  onChange={handleSignInChange}
                />
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Password"
                  required
                  value={signInData.password}
                  onChange={handleSignInChange}
                />
                <button type="submit">Sign In</button>
                <span className="switchText">
                  Don't Have An Account ?{" "}
                  <span onClick={() => setIsSignUp(true)}>Create</span>
                </span>
              </form>
            </div>
          )}
          {isSignUp && (
            <div className="sign-up">
              <h2>Sign Up</h2>
              <form onSubmit={handleSignUpSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={signUpData.name}
                  onChange={handleSignUpChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                />
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Password"
                  required
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                />
                <button type="submit">Sign Up</button>
                <span className="switchText">
                  Already Have An Account ?
                  <span onClick={() => setIsSignUp(false)}>Sign In</span>
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
