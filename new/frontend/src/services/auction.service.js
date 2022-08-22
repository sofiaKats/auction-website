import axios from "axios";

const API_URL = "http://localhost:8080/api/auction";

const getAllItems = (UserId) => {
    return axios.get(API_URL + '/all/' + UserId);
}

const AuctionService = {
    getAllItems,
  };
  
  export default AuctionService;