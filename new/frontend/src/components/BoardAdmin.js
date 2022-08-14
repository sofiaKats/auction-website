import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UserService from "../services/user.service";
// import UserInfo from "./UserInfo";
// import TestService from "../services/test.service";
// import EventBus from "../common/EventBus";

const BoardAdmin = () => {
  // const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  // const [isHidden, setIsHidden] = useState(false);
  // const [userInfo, setUserInfo] = useState([]);
  

  const init = () => {
    UserService.getAllUsers()
      .then(response => {
        console.log('Printing user data', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.log('Something went wrong', error);
      }) 
  }

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log('Printing id', id);
    UserService.deleteUserById(id)
      .then(response => {
        console.log('user deleted successfully', response.data);
        init();
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
  }

  // // user is hidden
  // if (isHidden === true) {
  //   return null;
  // }

  // const handleFindUser = (id) => {
  //   return (
  //     <div>
  //       {/* <UserInfo */}
  //     </div>
  //   );
    // UserService.getUserById(id)
    // .then(response => {
    //   console.log('user found successfully', response.data);
    //   setUserInfo(response.data);
    // })
    // .catch(error => {
    //   console.log('Something went wrong', error);
    // })
  // }


  // useEffect(() => {
  //   TestService.getAdminBoard().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();

  //       setContent(_content);

  //       if (error.response && error.response.status === 401) {
  //         EventBus.dispatch("logout");
  //       }
  //     }
  //   );
  // }, []);

  return (
    // <div className="container">
    //   <header className="jumbotron">
    //     <h3>{content}</h3>
    //   </header>
    // </div>
    <div className="AdminBoard-container">
      <h3>New User Registration Requests</h3>
      <hr/>
      <div className="custom-table">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="tbody-custom">
          {
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>
                <Link to={`/userinfo/${user.id}`} className="btn btn-info">Details</Link>
                <button className="btn btn-success" onClick={() => { handleDelete(user.id); }}>Accept</button>
                <button className="btn btn-danger" onClick={() => { handleDelete(user.id); }}>Delete</button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table> 
      </div>
    </div>
  );
};

export default BoardAdmin;
