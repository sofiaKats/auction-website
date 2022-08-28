import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AuctionService from "../services/auction.service";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
// import Barbie from "../images/barbie.jpg";



const ViewAuction = () => {
    const [userInfo, setUserInfo] = useState("");
    const [AuctionInfo, setAuctionInfo] = useState("");
    const [is_active, setIs_active] = useState("");
    const [sameIdFlag, setsameIdFlag] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    // const [image, setImage] = useState("");
    const { id } = useParams();  //fetch auction id parameter from url
    let navigate = useNavigate();

    
    useEffect(() => {
        // get current user to check if certain button should be displayed
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) { 
            // if the id of the current user is the same as userId from auction
            // if the auction is from the same user who is viewing the auction details at the moment
            if(currentUser.id === AuctionInfo.userId) 
                setsameIdFlag(true);
        }

        // now that we have the id of the auction, find auction in backend 
        // and print all the info below
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

        // making sure AuctionInfo is defined
        if(AuctionInfo) {
            // find user who owns auction, used only to print username at auction details
            UserService.getUserById(AuctionInfo.userId)
            .then(response => {
                //   console.log('user found successfully', response.data);
                setUserInfo(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    }, [id, AuctionInfo]);
    

    
    const handleDelete = (AuctionInfo, id, user_id) => {
        // console.log('AuctionInfo.isActive: ', AuctionInfo.isActive);
        // console.log('AuctionInfo.hasBids: ', AuctionInfo.hasBids);
        // making sure the user cannot delete auction if someone has placed a bid 
        // 
        if(AuctionInfo.isActive && AuctionInfo.hasBids) {
            setMessage("You cannot delete this listing anymore since it's active and someone has placed a bid!");
            setSuccessful(true);
        }
        else {
            setSuccessful(false);
            // DELETE THESE !
            console.log('Printing id @ delete', id);
            console.log('Printing id @ delete', user_id);
            navigate(`/manageauctions/${user_id}`);
            AuctionService.deleteItemById(id)
            .then(response => {
                console.log('auction listing deleted successfully', response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
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
                <p><strong><b>Listing Created By:</b> {userInfo.username}</strong></p>
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

                {/* JSX expression */}
                {sameIdFlag ? (
                    <div>
                        <button className="btn btn-primary btn-info" onClick={() => { handleStartAuction(id); }}>Start Auction</button>
                        <Link to={`/edit-auction/${id}`} className="btn btn-dark btn-info">Edit Listing</Link>
                        <button className="btn btn-danger btn-info" onClick={() => { handleDelete(AuctionInfo , id, AuctionInfo.userId); }}>Delete Listing</button>
                        {/* koumpi gia bids!!! */}
                    </div>
                ) : (
                    // EDW 8ELEI MONO GIA BIDS!!!!
                    <Link to={`/edit-auction/${id}`} className="btn btn-dark btn-info">Edit Listing</Link>
                )}

                {message && (
                <div className="form-group">
                    <div
                    className={
                        successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                    >
                    {message}
                    </div>
                </div>
                )}
            </div>
        </div>
    );

};

export default ViewAuction;