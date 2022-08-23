import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import AuctionService from "../services/auction.service";
// import Barbie from "../images/barbie.jpg";



const ViewAuction = () => {
    const [AuctionInfo, setAuctionInfo] = useState("");
    // const [image, setImage] = useState("");
    const { id } = useParams();  //fetch auction id parameter from url

    // now that we have the id of the auction, find auction in backend 
    // and print all the info below
    useEffect(() => {
        AuctionService.findAuctionById(id)
        .then(response => {
        //   console.log('user found successfully', response.data);
          setAuctionInfo(response.data);
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })
        }, [id]);
    

    return(
        <div className="card">
        {/* <div className="align-div">
            <img src={Barbie} className="img"></img>
        </div> */}
        <div className="container">
            <h2><b>{AuctionInfo.name}</b></h2>
            <p></p>
            <p></p>
            <p></p>
            <h4>Auction Listing Details:</h4>
            <p><b>Item Id:</b> {AuctionInfo.id}</p>
            <p><b>Current Price/Highest Bid:</b> {AuctionInfo.currently}$   <b>Number of Bids:</b> {AuctionInfo.number_of_Bids}</p>
            <p><b>Buy Price:</b>{AuctionInfo.buy_Price}$</p>
            <p><b>Location of Item:</b> {AuctionInfo.location}    <b>Country of Item:</b> {AuctionInfo.country}</p>
            <p><b>Latitude:</b> {AuctionInfo.latitude}   <b>Longitude:</b> {AuctionInfo.longitude}</p>
            <p><b>Auction Started At:</b> {AuctionInfo.started}    <b>Auction Ends At:</b> {AuctionInfo.ends}</p>
            <p><b>Description:</b> {AuctionInfo.description}</p>
            <p><b>Item Categories:</b></p>
              <ul>
                {AuctionInfo.category &&
                  AuctionInfo.category.map((category, index) => <li key={index}>{category}</li>)}
              </ul>
        </div>
        </div>
    );

};

export default ViewAuction;