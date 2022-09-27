import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/v1/users";


const getUserById = (UserId) => {
    return axios.get(API_URL + '/find/' + UserId, { headers: authHeader() });
};

const getAllUsers = () => {
    return axios.get(API_URL + '/all');
}

const getAllUsersCustom = () => {
    return axios.get(API_URL + '/custom/all', { headers: authHeader() });
}

const deleteUserById = (UserId) => {
    return axios.delete(API_URL + '/delete/' + UserId);
}

const acceptUserById = (UserId) => {
    return axios.put(API_URL + '/admin-acceptance/' + UserId);
}

// const getValidatedUserById = (UserId) => {
//     return axios.get(API_URL + '/findValidatedUser/' + UserId);
// }

const UserService = {
    getUserById,
    getAllUsers,
    deleteUserById,
    getAllUsersCustom,
    acceptUserById,
    // getValidatedUserById,
  };
  
  export default UserService;