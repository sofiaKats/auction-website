import axios from "axios";

const API_URL = "http://localhost:8080/api/auction";

const getAllItemsWithUserId = (UserId) => {
    return axios.get(API_URL + '/all/' + UserId);
}

const getAllItems = () => {
    return axios.get(API_URL + '/all');
}

const AuctionService = {
    getAllItemsWithUserId,
    getAllItems,
  };
  
  export default AuctionService;