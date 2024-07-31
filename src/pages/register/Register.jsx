
import React from "react";
import "./Register.css"; // Assuming you have a CSS file for styling
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Register() {
  const navigate = useNavigate();

  function validate(username, email, password, repassword) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username.current.value.length < 4) {
      alert("Username should contain at least 4 characters");
      username.current.focus();
      username.current.style.outlineColor = "red";
      return false;
    }
    if (!emailPattern.test(email.current.value)) {
      alert("Please enter a valid email address");
      email.current.focus();
      email.current.style.outlineColor = "red";
      return false;
    }
    if (password.current.value.length < 4) {
      alert("Password should contain at least 4 characters");
      password.current.focus();
      password.current.style.outlineColor = "red";
      return false;
    }
    if (repassword.current.value.length < 4) {
      alert("Confirm password should contain at least 4 characters");
      repassword.current.focus();
      repassword.current.style.outlineColor = "red";
      return false;
    }
    if (password.current.value !== repassword.current.value) {
      alert("Password and Confirm password are not the same");
      repassword.current.value = "";
      repassword.current.focus();
      repassword.current.style.outlineColor = "red";
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validate(userNameRef, emailRef, passwordRef, rePasswordRef);
    if (!isValid) {
      return;
    }
    const user = {
      userName: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    
    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.message === "User registered successfully") {
        navigate("/login");
      } else if (data.message === "Failed! Username is already in use!") {
        alert(data.message);
        userNameRef.current.focus();
      } else if (data.message === "Failed! Email is already in use!") {
        alert(data.message);
        emailRef.current.focus();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleNavigate() {
    navigate("/login");
  }

  const userNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const rePasswordRef = useRef("");

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>

        <label>
          <input
            ref={userNameRef}
            required
            placeholder=""
            type="text"
            className="input"
          />
          <span>Username</span>
        </label>

        <label>
          <input
            ref={emailRef}
            required
            placeholder=""
            type="email"
            className="input"
          />
          <span>Email</span>
        </label>

        <label>
          <input
            ref={passwordRef}
            required
            placeholder=""
            type="password"
            className="input"
          />
          <span>Password</span>
        </label>

        <label>
          <input
            ref={rePasswordRef}
            required
            placeholder=""
            type="password"
            className="input"
          />
          <span>Confirm password</span>
        </label>

        <button type="submit" className="submit">
          Submit
        </button>
        <p onClick={handleNavigate} className="signin">
          Already have an account? <a href="#">Signin</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
