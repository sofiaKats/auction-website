import React, { Component } from "react";
import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";

import AuthService from "../services/auth.service";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeVerifyPassword = this.onChangeVerifyPassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeGeoLocat = this.onChangeGeoLocat.bind(this);
    this.onChangeTaxIdentNum = this.onChangeTaxIdentNum.bind(this);
    
    

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      verify_password: "",
      email: "",
      phone: "",
      address: "",
      geographical_location: "",
      tax_Identification_Number: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeVerifyPassword(e) {
    this.setState({
      verify_password: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeGeoLocat(e) {
    this.setState({
      geographical_location: e.target.value
    });
  }

  onChangeTaxIdentNum(e) {
    this.setState({
      tax_Identification_Number: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.password,
        this.state.phone,
        this.state.address,
        this.state.geographical_location,
        this.state.tax_Identification_Number,
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response && error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
          <Form onSubmit={this.handleRegister} ref={c => {this.form = c;}}>
            <h3 className="Auth-form-title">Sign Up</h3>
            {!this.state.successful && (
              <div>
                <div className="form-group mt-3">
                  <label>Username</label>
                  <input type="text" className="form-control mt-1" placeholder="Username" value={this.state.username} onChange={this.onChangeUsername} required />
                </div>
                 <div className="form-group mt-3">
                   <label>First Name</label>
                   <input type="text" className="form-control mt-1" placeholder="First Name" value={this.state.firstName} onChange={this.onChangeFirstName}  required />
                 </div>
                 <div className="form-group mt-3">
                   <label>Last Name</label>
                   <input type="text" className="form-control mt-1" placeholder="Last Name" value={this.state.lastName} onChange={this.onChangeLastName}  required />
                 </div>
                 <div className="form-group mt-3">
                  <label>Password</label>
                  <input type="password" className="form-control mt-1" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} required/>
                </div>
                <div className="form-group mt-3">
                   <label>Verify Password</label>
                   <input type="password" className="form-control mt-1" placeholder="Verify Password" value={this.state.verify_password} onChange={this.onChangeVerifyPassword}  required/>
                 </div>
                 <div className="form-group mt-3">
                   <label>Email</label>
                   <input type="email" className="form-control mt-1" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail}  required />
                 </div>
                 <div className="form-group mt-3">
                   <label>Phone</label>
                   <input type="number" className="form-control mt-1" placeholder="Phone" value={this.state.phone} onChange={this.onChangePhone}  required />
                 </div>
                 <div className="form-group mt-3">
                   <label>Address</label>
                   <input type="text" className="form-control mt-1" placeholder="Address" value={this.state.address} onChange={this.onChangeAddress}  required />
                 </div>
                 <div className="form-group mt-3">
                   <label>Geographical Location</label>
                   <input type="text" className="form-control mt-1" placeholder="Geographical Location" value={this.state.geographical_location} onChange={this.onChangeGeoLocat}  required />
                 </div>
                 <div className="form-group mt-3">
                   <label>Tax Identification Number (Α.Φ.Μ)</label>
                   <input type="number" className="form-control mt-1" placeholder="Tax Identification Number" value={this.state.tax_Identification_Number} onChange={this.onChangeTaxIdentNum}  required />
                 </div>

                <div className="form-group">
                   <button type="submit" className="btn btn-dark btn-block"> Submit</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} />
            </Form>
          </div>
        </form>
      </div>
    )}
}
