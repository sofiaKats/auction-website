import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/users";


const getUserById = (UserId) => {
    return axios.get(API_URL + '/find/' + UserId);
};

const getAllUsers = () => {
    return axios.get(API_URL + '/all');
}

const deleteUserById = (UserId) => {
    return axios.delete(API_URL + '/delete/' + UserId);
}

const UserService = {
    getUserById,
    getAllUsers,
    deleteUserById,
  };
  
  export default UserService;