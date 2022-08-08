import React, { Component } from "react";
import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

// const required = value => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="Auth-form-container-LogIn">
        <form className="Auth-form">
          <div className="Auth-form-content">
          <Form onSubmit={this.handleLogin} ref={c => { this.form = c; }}>
            <h3 className="Auth-form-title">Log In</h3>
              <div>
                <div className="form-group mt-3">
                  <label>Username</label>
                  <input type="text" className="form-control mt-1" placeholder="Username" value={this.state.username} onChange={this.onChangeUsername} required />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input type="password" className="form-control mt-1" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} required/>
                </div>
                <div className="form-group">
                  <button className="btn btn-dark btn-block" >Log In</button>
                </div>

                {this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} />
              </div>
            </Form>
          </div>
        </form>
      </div>
    );
  }
}
