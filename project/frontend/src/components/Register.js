import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [verify_password, setVerifyPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [geographical_location, setGeoLocat] = useState("");
  const [tax_Identification_Number, setTaxIdentNum] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setfirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setlastName(lastName);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeVerifyPassword = (e) => {
    const verify_password = e.target.value;
    setVerifyPassword(verify_password);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  const onChangeGeoLocat = (e) => {
    const geographical_location = e.target.value;
    setGeoLocat(geographical_location);
  };

  const onChangeTaxIdentificationNumber = (e) => {
    const tax_Identification_Number = e.target.value;
    setTaxIdentNum(tax_Identification_Number);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);


    form.current.validateAll();
    //if all the input is given by the user
    if (checkBtn.current.context._errors.length === 0) {
      //if passwords dont match
      if(password !== verify_password) {
        setMessage("Passwords do not match");
        setSuccessful(false);
        return;
      }
      // call axios function, if everything works fine then send the saveUser request
      //else catch exception and print message
      AuthService.register(
        username,
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        geographical_location,
        tax_Identification_Number,
      ).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <Form onSubmit={handleRegister} ref={form}>
          <h3 className="Auth-form-title">Sign Up</h3>
          {!successful && (
            <div>
              <div className="form-group mt-3">
                <label>Username</label>
                <Input type="text" className="form-control mt-1" placeholder="Username" value={username} onChange={onChangeUsername} required />
              </div>
              <div className="form-group mt-3">
                <label>First Name</label>
                <Input type="text" className="form-control mt-1" placeholder="First Name" value={firstName} onChange={onChangeFirstName}  required />
              </div>
              <div className="form-group mt-3">
                <label>Last Name</label>
                <Input type="text" className="form-control mt-1" placeholder="Last Name" value={lastName} onChange={onChangeLastName}  required />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <Input type="password" className="form-control mt-1" placeholder="Password" value={password} onChange={onChangePassword} required/>
              </div>
              <div className="form-group mt-3">
                <label>Verify Password</label>
                <Input type="password" className="form-control mt-1" placeholder="Verify Password" value={verify_password} onChange={onChangeVerifyPassword}  required/>
              </div>
              <div className="form-group mt-3">
                <label>Email</label>
                <Input type="email" className="form-control mt-1" placeholder="Email" value={email} onChange={onChangeEmail}  required />
              </div>
              <div className="form-group mt-3">
                <label>Phone</label>
                <Input type="number" className="form-control mt-1" placeholder="Phone" value={phone} onChange={onChangePhone}  required />
              </div>
              <div className="form-group mt-3">
                <label>Address</label>
                <Input type="text" className="form-control mt-1" placeholder="Address" value={address} onChange={onChangeAddress}  required />
              </div>
              <div className="form-group mt-3">
                <label>Geographical Location</label>
                <Input type="text" className="form-control mt-1" placeholder="Geographical Location" value={geographical_location} onChange={onChangeGeoLocat}  required />
              </div>
              <div className="form-group mt-3">
                <label>Tax Identification Number (Α.Φ.Μ)</label>
                <Input type="number" className="form-control mt-1" placeholder="Tax Identification Number" value={tax_Identification_Number} onChange={onChangeTaxIdentificationNumber}  required />
              </div>

              <div className="form-group mt-3">
                <button type="submit" className="form-control btn btn-dark btn-block mt-1"> Submit</button>
              </div>
            </div>
          )}

          {/* check if the registration request is successful, and if not print corresponding message */}
          {message && (
            <div className="form-group">
              <div
                className={
                  successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
            )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
