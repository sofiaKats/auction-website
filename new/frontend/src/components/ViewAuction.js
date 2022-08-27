import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import AuctionService from "../services/auction.service";
// import Barbie from "../images/barbie.jpg";



const ViewAuction = () => {
    const [AuctionInfo, setAuctionInfo] = useState("");
    const [is_active, setIs_active] = useState("");
    // const [image, setImage] = useState("");
    const { id } = useParams();  //fetch auction id parameter from url

    // now that we have the id of the auction, find auction in backend 
    // and print all the info below
    useEffect(() => {
        AuctionService.findAuctionById(id)
        .then(response => {
        //   console.log('user found successfully', response.data);
          setAuctionInfo(response.data);

          // a boolean in sql database is stored as bit(1) type with values either 0x00 or 0x01
          // thus cannot be displayed as string, so we use another variable to display the value
          if(AuctionInfo.isActive) setIs_active("true");
          else setIs_active("false");
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })
        }, [id, AuctionInfo]);
    

    
    const handleDelete = (id) => {
        console.log('Printing id @ delete', id);
        AuctionService.deleteItemById(id)
        .then(response => {
            console.log('auction listing deleted successfully', response.data);
        })
        .catch(error => {
            console.log('Something went wrong', error);
        })
    }

    const handleStartAuction = (id) => { 
        AuctionService.startAuction(id)
        .then(response => {
            console.log('auction listing started successfully', response.data);
        })
        .catch(error => {
            console.log('Something went wrong', error);
        })
    }

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
            <p><b>Current Price/Highest Bid:</b> {AuctionInfo.currently}$ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Number of Bids:</b> {AuctionInfo.number_of_Bids}</p>
            <p><b>Buy Price:</b>{AuctionInfo.buy_Price}$</p>
            <p><b>Location of Item:</b> {AuctionInfo.location}  &nbsp;&nbsp;&nbsp;&nbsp;  <b>Country of Item:</b> {AuctionInfo.country}</p>
            <p><b>Latitude:</b> {AuctionInfo.latitude}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Longitude:</b> {AuctionInfo.longitude}</p>
            <p><b>Auction Started At:</b> {AuctionInfo.started}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   <b>Auction Ends At:</b> {AuctionInfo.ends}</p>
            <p><b>Is Listing Active?:</b> { is_active}</p>
            <p><b>Description:</b> {AuctionInfo.description}</p>
            <p><b>Item Categories:</b></p>
              <ul>
                {AuctionInfo.category &&
                  AuctionInfo.category.map((category, index) => <li key={index}>{category}</li>)}
              </ul>
              <button className="btn btn-primary btn-info" onClick={() => { handleStartAuction(id); }}>Start Auction</button>
              <Link to={`/edit-auction/${id}`} className="btn btn-dark btn-info">Edit Listing</Link>
              <button className="btn btn-danger btn-info" onClick={() => { handleDelete(id); }}>Delete Listing</button>
        </div>
        </div>
    );

};

export default ViewAuction;