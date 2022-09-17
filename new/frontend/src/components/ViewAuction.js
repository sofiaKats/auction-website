import React, { useState, useRef, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AuctionService from "../services/auction.service";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Slide } from "react-slideshow-image";
// import { Carousel } from 'react-responsive-carousel';
import "react-slideshow-image/dist/styles.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { FormGroup } from "react-bootstrap";



const ViewAuction = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [currentUserId, setCurrentUserId] = useState(undefined);
    const [registeredUser, setRegisteredUser] = useState(undefined);
    const [userInfo, setUserInfo] = useState("");
    const [AuctionInfo, setAuctionInfo] = useState("");
    const [is_active, setIs_active] = useState("");
    const [sameIdFlag, setsameIdFlag] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [images, setImages] = useState([]);
    // flag to insure images are getting fetched only once from database
    const [fetchedAllImages, setFetchedAllImages] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [imageMessage, setImageMessage] = useState("");
    const [bids, setBids] = useState([]);
    // const [userInfo, setUserInfo] = useState("");
    const [amount, setAmount] = useState("");
    const [username, setUsername] = useState("");
    const [isCheckedBid, setIsCheckedBid] = useState(false);
    const [successfulBid, setSuccessfulBid] = useState(false);
    const [messageBid, setMessageBid] = useState("");
    const [auctionWinnerUser, setAuctionWinnnerUser] = useState(undefined);
    // flag to check if owner of item has given longitude and latitude
    const [hasLongitudeAndLatitude, setHasLongitudeAndLatitude] = useState(false);
    const [address, setAddress] = useState([]);
    const [fetchedNominatim, setFetchNominatim] = useState(false); //using this flag because nominatim page thinks im attacking it when i 
    // when i call function inside useEffect that lead to continuous GET requests from nominatim page
    const { id } = useParams();  //fetch auction id parameter from url
    let navigate = useNavigate();

    const onChangeAmount = (e) => {
        const amount = e.target.value;
        setAmount(amount);
    };

    useEffect(() => {
        // get current user to check if certain button should be displayed
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) { 
            setCurrentUserId(currentUser.id);
            setRegisteredUser(currentUser);
            setUsername(currentUser.username);
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

          // find longitude and latitude from item's location and country
          if(AuctionInfo && !fetchedNominatim) {
            fetchCoordinates(AuctionInfo.location, AuctionInfo.country, address, AuctionInfo);
            setFetchNominatim(true); // dont re-call function, nominatim thinks i'm attacking the page
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

        //making sure item listing has pictures
        if(AuctionInfo.hasImages && !fetchedAllImages) {
            AuctionService.getAllImages(id)
            .then(response => {
                setImages(response.data);
                console.log("images: ", response.data, " image 0 url:", response.data[0].url);
                setFetchedAllImages(true);
            })
            .catch(error => {
                console.log('Something went wrong while getting images', error);
            })
        }

        ////////////////////////////////////////////////////////////////
        ////////////////////////// BIDS ///////////////////////////////
        AuctionService.getAllBids(id)
        .then(response => {
            setBids(response.data);
        })
        .catch(error => {
            console.log('Something went wrong', error);
        })

        if(AuctionInfo.isActive) {
            AuctionService.KillAuctionListing(id)
            .then(response => {
                console.log("called killAuction successfully");
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }

        // if auction is no longer active but once was active or someone bought it
        if((!AuctionInfo.isActive && AuctionInfo.ends) || AuctionInfo.boughtFlag) {
            AuctionService.getWinnerOfAuction(id)
            .then(response => {
                setAuctionWinnnerUser(response.data);
                // if(auctionWinnerUser) {
                //     console.log("winner of auction is", auctionWinnerUser.username);
                // }
            })
            .catch(error => {
                console.log('Something went wrong finding the winner of auction', error);
            })
        }
        
        
    }, [id, AuctionInfo, address, fetchedNominatim, fetchedAllImages]);

    ////////////////////////////////////////////////////////////////
    ///////// Select file and upload pictures on listing //////////
    const selectFile = (e) => {
        // const selectedFiles = e.target.files;
        setSelectedFiles(e.target.files);
    };

    const upload = (id) => {
      let currentFile = selectedFiles[0];
      setProgress(0);
      setCurrentFile(currentFile);

      AuctionService.uploadPicture(id, currentFile, (event) => {
          setProgress(Math.round((100 * event.loaded) / event.total));
      })
      .then((response) => {
        setImageMessage(response.data.message);
        return AuctionService.getAllImages(id);
      })
      .then((files) => {
        setImages(files.data);
      })
      .catch(() => {
        setProgress(0);
        setImageMessage("Could not upload the file!");
        setCurrentFile(undefined);
      })
      setSelectedFiles(undefined);
    }
    ////////////////////////////////////////////////////////////////

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

    const fetchCoordinates = (location, country, address, AuctionInfo) => { 
        // format string to suit url
        // split string and keep only words in indexes of array
        const locationArray = location.split(" ");
        var locationString = locationArray[0]; // first word doesn't need a '+' on the link

        // if item's    location=Los Angeles CA  and   Country=USA    then the link will look like this
        // https://nominatim.openstreetmap.org/search?q=los+angeles+CA+USA&format=json&polygon=1&addressdetails=1
        for (let i = 1; i < locationArray.length; i++) {
            locationString += "+"; locationString += locationArray[i];
        }
        setAddress(locationString);

        AuctionService.getCoordinates(address, country)
        .then(response => {
            console.log("response.data: ", response.data);
            console.log("lat and lon from data:", response.data[0].lat, response.data[0].lon);


            AuctionService.updateAuction (
                AuctionInfo.name,
                AuctionInfo.buy_Price,
                AuctionInfo.location,
                AuctionInfo.country,
                AuctionInfo.description,
                AuctionInfo.categories, 
                response.data[0].lat,
                response.data[0].lon, 
                AuctionInfo.id
            ).then(res => {
                console.log("edited item successfully @ getCoordinates", res.data);
            })
            .catch(error => {
                console.log('Could not update listing while fetching coordinates', error);
            })

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

    const handleBuyAuction = (item_id, user) => {
        // user bought the item, add it as bid
        AuctionService.addBid (
            AuctionInfo.buy_Price,
            item_id,
            user.id,
            user.username
        ).then( (response) => {
            // window.location.reload();
        })
        .catch(error => {
            console.log('Something went wrong while buying listing', error);
        })

        // update active listing flag to false
        AuctionService.buyAuctionListing(item_id)
        .then(response => {
            console.log('Listing was bought successfully', response.data);
        })
        .catch(error => {
            console.log('Something went wrong', error);
        })
    }

    const handlePlaceBid  = currentUserId => event => {
        event.preventDefault();
    
        setMessageBid("");
        setSuccessfulBid(false);

        form.current.validateAll();
        //if all the input is given by the user, and amount is not null
        if ((checkBtn.current.context._errors.length === 0) && amount) {
          AuctionService.addBid (
            amount,
            id,
            currentUserId,
            username
          ).then(
            (response) => {
              setMessageBid("Bid Placed Successfully!");
              setSuccessfulBid(true);
              window.location.reload();
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              setMessageBid(resMessage);
              setSuccessfulBid(false);
            }
          );
        }
      }

    return(
        <div>
        {/* start of product card */}
        <div className="card">
            {/* JSX expression */}
                {/* if the user is not a visitor allow bids/start auction etc */}
                {registeredUser && (
                    <div>
                        {sameIdFlag && (
                            // if the person who visited auction details, is the creator of the auction 
                            // allow this user to upload images 
                            <div>
                                {currentFile && (
                                <div className="progress">
                                    <div className="progress-bar progress-bar-info progress-bar-striped"
                                    role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"
                                    style={{ width: progress + "%" }} > {progress}% </div>
                                </div>
                                )}

                                <label className="btn btn-default">
                                    <input type="file" onChange={selectFile} />
                                </label>
                                <button className="btn btn-success" disabled={!selectedFiles} onClick={() => { upload(id); }} > Upload </button>
                                <div className="alert alert-light" role="alert"> {imageMessage} </div>
                            </div>
                        )}
                    </div>
                )}
            <ul className="list-group-flush">
                {images &&
                images.map((image, index) => (
                    <li className="list-group-item" key={index}>
                        <a href="#image">
                            <img src={image.url} className="img" alt="visual representation of item to be sold."></img>
                        </a>
                    </li>
                ))}
            </ul>
            {/* <div className="slide-container">
                <Slide>
                {images && 
                images.map((image, index)=> (
                    <div className="each-slide" key={index}>
                     <div style={{'backgroundImage': `url(${image.url})`}}>
                        <span>{image.name}</span>
                    </div> 
                         <img src={image.url} className="img" alt="visual representation of item to be sold." /> 
                    </div>
                ))} 
                </Slide>
            </div> */}
            {/* <ImageGallery items={images} /> */}
            {/* <Carousel showArrows={true} >
                {images && 
                    images.map((image, index)=> (
                        <div key={index}>
                        <img src={image.url} className="img" alt="visual representation of item to be sold." /> 
                        </div>
                     ))} 
            </Carousel> */}
            <div className="container">
                <h2><b>{AuctionInfo.name}</b></h2>
                <p></p>
                <p></p>
                <p></p>
                {AuctionInfo.started && !AuctionInfo.isActive && (
                    <b><h2 className="expiredAuction">LISITNG HAS EXPIRED</h2></b>
                )}
                {auctionWinnerUser ? (
                    <b><h3 className="winnerAuction">Winner of Auction is: {auctionWinnerUser.username}, won for: {AuctionInfo.currently}$</h3></b>
                ):(
                    <b><h3>No one won the auction</h3></b>
                )}
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
                      center={[AuctionInfo.latitude, AuctionInfo.longitude]}
                      zoom={6} maxZoom={10} attributionControl={true} zoomControl={true}
                      doubleClickZoom={true} scrollWheelZoom={true} dragging={true}
                      animate={true} easeLinearity={0.35} >
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
                        <Marker position={[AuctionInfo.latitude, AuctionInfo.longitude]}>
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
                         {sameIdFlag && (
                            // if the person who visited auction details, is the creator of the auction 
                            <div>
                                <button className="btn btn-success " onClick={() => { handleStartAuction(id); }}>Start Auction</button>
                                <Link to={`/edit-auction/${id}`} className="btn btn-dark btn-info">Edit Listing</Link>
                                <button className="btn btn-danger btn-info" onClick={() => { handleDelete(AuctionInfo , id, AuctionInfo.userId); }}>Delete Listing</button>
                            </div>
                        )}
                        {/* if the person who visited auction details has not created the auction
                            if listing has a buy price
                            if no one has won the auction yet  */}
                        {!sameIdFlag && AuctionInfo.buy_Price && !auctionWinnerUser && (
                            <button className="btn btn-primary btn-info" onClick={() => { handleBuyAuction(id, registeredUser); }} >Buy Item</button>
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
        {/* end of product card */}
        {/* start of bid card */}
        <div>
        {/* Creator of listing is not allowed to bid  */}
        {!sameIdFlag && AuctionInfo.isActive && (
            <div>
            <div className="Auth-form-container">
            <div className="Auth-form">
            <Form onSubmit={handlePlaceBid(currentUserId)} ref={form}>
                <h3 className="Auth-form-title">Bid</h3>
                {!successfulBid && (
                    <div className="form-group mt-3">
                      <FormGroup>
                        <label>Amount</label>
                        <Input type="number" name="pmInput" id="pmInput" className="form-control mt-1" placeholder="Amount"  value={amount} onChange={onChangeAmount} disabled={!isCheckedBid} required />
                        <label htmlFor="mpinput">Would you like to place a bid? Check box if yes. <b> Warning!</b> Action is irreversible!</label>
                        <Input type="checkbox" id="mpCheckbox" onChange={(e) => setIsCheckedBid(e.target.checked)} />
                        <button type="submit" className="form-control btn btn-dark btn-block mt-1"> Submit Bid </button>
                      </FormGroup>
                    </div>
                    )}

                    {/* check if the registration request is successful, and if not print corresponding message */}
                    {messageBid && (
                    <div className="form-group">
                        <div
                        className={
                            successfulBid
                            ? "alert alert-success"
                            : "alert alert-danger"
                        }
                        role="alert"
                        >
                        {messageBid}
                        </div>
                    </div>
                    )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>    
            </div>
            </div>
            </div>
        )}
        {/* end of bid card */}
        {/* start of bids list */}
        <div className="AdminBoard-container">
            <h3>All Bids</h3>
            <hr/>
            <div className="custom-table">
                <table className="table table-bordered table-striped">
                <thead className="thead-light">
                    <tr>
                    <th>Bid Id:</th>
                    <th>Bid Placed By:</th>
                    <th>Time:</th>
                    <th>Amount:</th>
                    </tr>
                </thead>
                <tbody className="tbody-custom">
                {
                    bids.map(bid => (
                    <tr key={bid.id}>
                        <td>{bid.id}</td>
                        <td>{bid.username}</td>
                        <td>{bid.time}</td>
                        <td>{bid.amount}</td>
                    </tr>
                    ))
                }
                </tbody>
                </table> 
            </div>
        </div>
        {/* end of bids list */}
        </div> {/* bid div */}
        </div> // render div 
    );
};

export default ViewAuction;