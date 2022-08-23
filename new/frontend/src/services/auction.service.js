import axios from "axios";

const API_URL = "http://localhost:8080/api/auction";

const getAllItemsWithUserId = (UserId) => {
    return axios.get(API_URL + '/all/' + UserId);
}

const getAllItems = () => {
    return axios.get(API_URL + '/all');
}

const findAuctionById = (id) => {
    return axios.get(API_URL + '/find/' + id);
}

const addAuction = (name, buy_Price, location, country, description, UserId, categories, latitude, longitude) => {
    return axios.post(API_URL + '/add/' + UserId, {
        name,
        buy_Price,
        location,
        country,
        description,
        categories,
        latitude,
        longitude
      });
};

const AuctionService = {
    getAllItemsWithUserId,
    getAllItems,
    addAuction,
    findAuctionById,
  };
  
  export default AuctionService;