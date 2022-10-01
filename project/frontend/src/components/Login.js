import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
// import UserService from "../services/user.service";

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");

    // if(username !== "@admin") {
    //   UserService.getAllUsers();
    // }

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          if(username === "@admin")
            navigate("/admin");
          else 
            navigate("/frontpage");
          
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
        }
      );
    }
  };

  return (
    <div className="Auth-form-container-LogIn">
      <div className="Auth-form">
        <Form onSubmit={handleLogin} ref={form}>
        <h3 className="Auth-form-title">Log In</h3>
          <div className="form-group mt-3">
            <label htmlFor="username">Username</label>
            <Input type="text" className="form-control mt-1" name="username" value={username} onChange={onChangeUsername} required />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <Input type="password" className="form-control mt-1" name="password" value={password} onChange={onChangePassword} required/>
          </div>

          <div className="form-group mt-3">
            {/* <button className="form-control btn btn-dark btn-block mt-1" disabled={loading}>
              {loading && ( <span className="spinner-border spinner-border-sm"></span> )} <span>Log In</span> </button> */}
            <button className="form-control btn btn-dark btn-block mt-1" >Log In</button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert"> {message} </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
