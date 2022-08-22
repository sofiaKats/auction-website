import axios from "axios";

const API_URL = "http://localhost:8080/api/auction";

const getAllItems = () => {
    return axios.get(API_URL + '/all');
}

const AuctionService = {
    getAllItems,
  };
  
  export default AuctionService;