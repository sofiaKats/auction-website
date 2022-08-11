import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/users";


const getUserById = (UserId) => {
    return axios.get(API_URL + '/' + UserId);
};

const UserService = {
    getUserById,
  };
  
  export default UserService;