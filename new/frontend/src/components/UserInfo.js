import React , { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState("");
    const { id } = useParams();  //fetch id parameter from url

    // now that we have the id of the user, find user in backend 
    // and print all the info below
    useEffect(() => {
    UserService.getUserById(id)
    .then(response => {
    //   console.log('user found successfully', response.data);
      setUserInfo(response.data);
    })
    .catch(error => {
      console.log('Something went wrong', error);
    })
    }, [id]);

    return(
    <div className="Auth-form-container-LogIn">
        <div className="Auth-form">
        <h3 className="Auth-form-title"><strong>{userInfo.username}</strong> Details </h3>
          <div className="form-group mt-3">
            <label><strong>Id:</strong> {userInfo.id}</label>
          </div>
          <div className="form-group mt-3">
            <label><strong>FirstName:</strong> {userInfo.firstName}</label>
          </div>
          <div className="form-group mt-3">
            <label><strong>LastName:</strong> {userInfo.lastName}</label>
          </div>
          <div className="form-group mt-3">
            <label><strong>Email:</strong> {userInfo.email}</label>
          </div>
          <div className="form-group mt-3">
            <label><strong>Phone:</strong> {userInfo.phone}</label>
          </div>
          <div className="form-group mt-3">
            <label><strong>Address:</strong> {userInfo.address}</label>
          </div>
          <div className="form-group mt-3">
            <label><strong>Geographical Location:</strong> {userInfo.geographical_location}</label>
          </div>
          <div className="form-group mt-3">
            <label><strong>Tax Identification Number:</strong> {userInfo.tax_Identification_Number}</label>
          </div>
          {/* <div className="form-group mt-3">
            <strong>Authorities:</strong>
            <ul>
              {userInfo.roles &&
                userInfo.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
          </div> */}
      </div>
    </div>
    );

};

export default UserInfo;