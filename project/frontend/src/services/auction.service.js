import axios from "axios";
import http from "../http-common";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auction";

const getAllItemsWithUserId = (UserId) => {
    return axios.get(API_URL + '/all/' + UserId, { headers: authHeader() });
}

const getCoordinates = (address, country) => {
    return axios.get("https://nominatim.openstreetmap.org/search?q=" +
    address + "+" + country + "&format=json&polygon=1&addressdetails=1");
}


const getAllBids = (item_id) => {
    return axios.get(API_URL + '/bids/all/'+ item_id);
}

const getWinnerOfAuction = (item_id) => {
    return axios.get(API_URL  + '/winner/' + item_id);
}

const getAllItems = () => {
    return axios.get(API_URL + '/all');
}

const getAllActiveItems = () => {
    return axios.get(API_URL + '/active/all');
}

const getAllCategories = () => {
    return axios.get(API_URL + '/search/categories');
}

const getAllActivePagedItems = (params) => {
    return axios.get(API_URL + '/active/page/all', {
        params
    });
}

const findAuctionById = (id) => {
    return axios.get(API_URL + '/find/' + id);
}

const getAllImages = (id) => {
    return axios.get('http://localhost:8080/images/AllFiles/' + id);
}

const deleteItemById = (id) => {
    return axios.delete(API_URL + '/delete/' + id);
}

// /bids/add/{item_id}/{user_id}
const addBid = (amount, item_id, user_id, username) => {
    return axios.post(API_URL + '/bids/add/' + item_id + '/' + user_id, {
        amount,
        username
    });
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

const uploadPicture = (id, file, onUploadProgress)  => {
    // let formData = new FormData();

    // console.log("MPHKA!!");

    // formData.append("file", file);
    // const config = {     
    //     headers: { "Content-Type": "multipart/form-data", }
    // }

    // return axios.post("http://localhost:8080/images/upload/" + id , formData, config, onUploadProgress);
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/upload/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
}

const startAuction = (id) => {
    return axios.put(API_URL + '/start/' + id);
}

const buyAuctionListing = (id) => {
    return axios.put(API_URL + '/buy/' + id);
}

const updateAuction = (name, buy_Price, location, country, description, categories, latitude, longitude, id) => {
    return axios.put(API_URL + '/update/'+ id , {
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
const KillAuctionListing = (id) => {
    return axios.put(API_URL + '/die/'+ id);
};

const AuctionService = {
    getAllItemsWithUserId,
    getAllItems,
    addAuction,
    findAuctionById,
    deleteItemById,
    updateAuction,
    getAllActiveItems,
    startAuction,
    getAllBids,
    addBid,
    getAllActivePagedItems,
    getAllCategories,
    getAllImages,
    uploadPicture,
    KillAuctionListing,
    getWinnerOfAuction,
    buyAuctionListing,
    getCoordinates,
  };
  
  export default AuctionService;