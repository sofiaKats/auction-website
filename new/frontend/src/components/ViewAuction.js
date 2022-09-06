import React, { useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AuctionService from "../services/auction.service";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'
// import worldGeoJSON from 'geojson-world-map';



const ViewAuction = () => {
    const [currentUserId, setCurrentUserId] = useState(undefined);
    const [registeredUser, setRegisteredUser] = useState(undefined);
    const [userInfo, setUserInfo] = useState("");
    const [AuctionInfo, setAuctionInfo] = useState("");
    const [is_active, setIs_active] = useState("");
    const [sameIdFlag, setsameIdFlag] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    // const [images, setImages] = useState([]);
    // flag to check if owner of item has given longitude and latitude
    const [hasLongitudeAndLatitude, setHasLongitudeAndLatitude] = useState(false);
    const { id } = useParams();  //fetch auction id parameter from url
    let navigate = useNavigate();


    useEffect(() => {
        // get current user to check if certain button should be displayed
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) { 
            setCurrentUserId(currentUser.id);
            setRegisteredUser(currentUser);
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
          if(AuctionInfo.longitude) {
                setHasLongitudeAndLatitude(true);
          }

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


        //making sure item listing has pictures if(AuctionInfo.hasImages) 
        // AuctionService.getAllImages(id)
        // .then(response => {
        //     setImages(response.data);
        // })
        // .catch(error => {
        //     console.log('Something went wrong while getting images', error);
        // })
        
    }, [id, AuctionInfo]);


    const handleDelete = (AuctionInfo, id, user_id) => {
        // console.log('AuctionInfo.isActive: ', AuctionInfo.isActive);
        // console.log('AuctionInfo.hasBids: ', AuctionInfo.hasBids);
        // making sure the user cannot delete auction if someone has placed a bid 
        // 
        if(AuctionInfo.isActive && AuctionInfo.hasBids) {
            setMessage("You cannot delete this listing anymore since it's active and someone has placed a bid!");
            setSuccessful(false);
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
            {/* <ul className="list-group-flush">
                {images &&
                images.map((image, index) => (
                    <li className="list-group-item" key={index}>
                        <a href="#image">
                            <img src={image.url} className="img" alt="visual representation of item to be sold."></img>
                        </a>
                    </li>
                ))}
            </ul> */}
            {/* <div className="slide-container">
                <Slide>
                {images.map((image, index)=> (
                    <div className="each-slide" key={index}>
                    <div style={{'backgroundImage': `url(${image.url})`}}>
                        <span>rgsrtt</span>
                    </div>  
                        <img src={image.url} className="img" alt="visual representation of item to be sold." /> 
                    </div>
                ))} 
                </Slide>
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

                <p><b>Item's Location:</b></p>
                {hasLongitudeAndLatitude && (
                    <MapContainer
                      center={[AuctionInfo.longitude, AuctionInfo.latitude]}
                      zoom={6}
                      maxZoom={10}
                      attributionControl={true}
                      zoomControl={true}
                      doubleClickZoom={true}
                      scrollWheelZoom={true}
                      dragging={true}
                      animate={true}
                      easeLinearity={0.35}
                    >
                      {/* <GeoJSON
                      data={worldGeoJSON}
                        style={() => ({
                            color: '#4a83ec',
                            weight: 0.5,
                            fillColor: "#1a1d62",
                            fillOpacity: 1,
                        })}
                      /> */}
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[AuctionInfo.longitude, AuctionInfo.latitude]}>
                          <Popup>
                              Popup for any custom information.
                          </Popup>
                        </Marker>
                    </MapContainer>
                )}
                {/* JSX expression */}
                {/* if the user is not a visitor allow bids/start auction etc */}
                {registeredUser && (
                    <div>
                        {sameIdFlag ? (
                            // if the person who visited auction details, is the creator of the auction 
                            <div>
                                <button className="btn btn-success " onClick={() => { handleStartAuction(id); }}>Start Auction</button>
                                <Link to={`/edit-auction/${id}`} className="btn btn-dark btn-info">Edit Listing</Link>
                                <button className="btn btn-danger btn-info" onClick={() => { handleDelete(AuctionInfo , id, AuctionInfo.userId); }}>Delete Listing</button>
                            </div>
                        ) : (
                            <Link to={`/bid/${id}/${currentUserId}`} className="btn btn-primary btn-info">Bid</Link>
                        )}
                    </div>
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