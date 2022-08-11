import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="Auth-form-container-LogIn">
      <div className="Auth-form">
        <h3 className="Auth-form-title"><strong>{currentUser.username}</strong> Profile</h3>
          <div className="form-group mt-3">
            <label><strong>Id:</strong> {currentUser.id}</label>
          </div>
          <div className="form-group mt-3">
            <label><strong>FirstName:</strong> {currentUser.firstName}</label>
          </div>
          <div className="form-group mt-3">
            <label><strong>LastName:</strong> {currentUser.lastName}</label>
          </div>
          <div className="form-group mt-3">
            <label><strong>Email:</strong> {currentUser.email}</label>
          </div>
          <div className="form-group mt-3">
            <label><strong>Phone:</strong> {currentUser.phone}</label>
          </div>
          <div className="form-group mt-3">
            <label><strong>Address:</strong> {currentUser.address}</label>
          </div>
          <div className="form-group mt-3">
            <label><strong>Geographical Location:</strong> {currentUser.geographical_location}</label>
          </div>
          <div className="form-group mt-3">
            <label><strong>Tax Identification Number:</strong> {currentUser.tax_Identification_Number}</label>
          </div>
          <div className="form-group mt-3">
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
          </div>
      </div>
    </div>
  );
};

export default Profile;
