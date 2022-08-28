import React, { useState, useRef, useEffect} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useParams } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import { FormGroup } from "react-bootstrap";
import AuctionService from "../services/auction.service";

function EditAuction() {
    const { id } = useParams();  //fetch auction id parameter from url

    const form = useRef();
    const checkBtn = useRef();
  
    const [name, setName] = useState("");
    const [buyPrice, setBuyPrice] = useState("");
    const [location, setLocation] = useState("");
    const [country, setCountry] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [AuctionInfo, setAuctionInfo] = useState("");


    // now that we have the id of the auction, find auction in backend 
    // and print all the info below in the placeholders
    useEffect(() => {
        AuctionService.findAuctionById(id)
        .then(response => {
          setAuctionInfo(response.data);
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })
        }, [id]);

    const onChangeItemName = (e) => {
        const name = e.target.value;
        setName(name);
      };
    
      const onChangeBuyPrice = (e) => {
        const buyPrice = e.target.value;
        setBuyPrice(buyPrice);
      };
    
      const onChangeLocation = (e) => {
        const location = e.target.value;
        setLocation(location);
      };
    
      const onChangeCountry = (e) => {
        const country = e.target.value;
        setCountry(country);
      };
    
      const onChangeLatitude = (e) => {
        const latitude = e.target.value;
        setLatitude(latitude);
      };
    
      const onChangeLongitude = (e) => {
        const longitude = e.target.value;
        setLongitude(longitude);
      };
    
      const onChangeCategory = (e) => {
        const category = e.target.value;
        setCategory(category);
      };
    
      const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
      };
    
      const handleEditAuction  = (e) => {
        e.preventDefault();
    
        setMessage("");
        setSuccessful(false);

        if(AuctionInfo.isActive && AuctionInfo.hasBids) {
          setMessage("You cannot delete this listing anymore since it's active and someone has placed a bid!");
          setSuccessful(false);
          return;
        }
    
        form.current.validateAll();
        //if all the input is given by the user
        if (checkBtn.current.context._errors.length === 0) {
          //call axios function, if everything works fine then send the saveUser request
          //else catch exception and print message
          AuctionService.updateAuction (
            name,
            buyPrice,
            location,
            country,
            description,
            category, 
            latitude,
            longitude, 
            id
          ).then(
            (response) => {
              setMessage("Auction Listing Edited Successfully!");
              setSuccessful(true);
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              setMessage(resMessage);
              setSuccessful(false);
            }
          );
        }
      }
  

    return (
        <div className="Auth-form-container">
      <div className="Auth-form">
      <Form onSubmit={handleEditAuction} ref={form}>
          <h3 className="Auth-form-title">Edit Auction</h3>
          {!successful && (
            <div>
              <div className="form-group mt-3">
                <label>Item Name</label>
                <h6 className="edit-auction-h6"><b>{AuctionInfo.name}</b></h6>
                <Input type="text" className="form-control mt-1" placeholder="Item Name" value={name} onChange={onChangeItemName} required />
              </div>
              <div className="form-group mt-3">
                <FormGroup>
                <label>Buy Price</label>
                <h6 className="edit-auction-h6"><b>{AuctionInfo.buy_Price}</b></h6>
                <Input type="number" name="pmInput" id="pmInput" className="form-control mt-1" placeholder="Buy Price"  value={buyPrice} onChange={onChangeBuyPrice} required disabled={isChecked} />
                <label htmlFor="mpinput">Would you like to skip adding a Buy Price? Check box if yes.</label>
                <Input type="checkbox" id="mpCheckbox" onChange={(e) => setIsChecked(e.target.checked)} />
              </FormGroup>
              </div>
              <div className="form-group mt-3">
                <label>Location</label>
                <h6 className="edit-auction-h6"><b>{AuctionInfo.location}</b></h6>
                <Input type="text" className="form-control mt-1" placeholder="Location" value={location} onChange={onChangeLocation} required />
              </div>
              <div className="form-group mt-3">
                <label>Country</label>
                <h6 className="edit-auction-h6"><b>{AuctionInfo.country}</b></h6>
                <Input type="text" className="form-control mt-1" placeholder="Country" value={country} onChange={onChangeCountry} required />
              </div>
              <div className="form-group mt-3">
                <FormGroup>
                <label>Latitude</label>
                <h6 className="edit-auction-h6"><b>{AuctionInfo.latitude}</b></h6>
                <Input type="text" name="pmInput" id="pmInput" className="form-control mt-1" placeholder="Latitude"  value={latitude} onChange={onChangeLatitude} required disabled={isChecked2} />
                <label>Longitude</label>
                <h6 className="edit-auction-h6"><b>{AuctionInfo.longitude}</b></h6>
                <Input type="text" name="pmInput" id="pmInput" className="form-control mt-1" placeholder="Longitude"  value={longitude} onChange={onChangeLongitude} required disabled={isChecked2} />
                <label htmlFor="mpinput">Would you like to skip adding Latitude and Longitude? Check box if yes.</label>
                <Input type="checkbox" id="mpCheckbox" onChange={(e) => setIsChecked2(e.target.checked)} />
              </FormGroup>
              </div>
              <div className="form-group mt-3">
                <label>Category</label>
                <h6 className="edit-auction-h6"><b>{AuctionInfo.categories}</b></h6>
                <label>Separate more than one categories with comma.</label>
                <label className="create-auction-label">two or more word categories are separated with `-` and not space (e.g denim-jacket).</label>
                <Input type="text" className="form-control mt-1" placeholder="Category" value={category} onChange={onChangeCategory} required />
              </div>
              <div className="form-group mt-3">
                <label>Description</label>
                <h6 className="edit-auction-h6"><b>{AuctionInfo.description}</b></h6>
                <Input type="text" className="form-control mt-1" placeholder="Description" value={description} onChange={onChangeDescription} required />
              </div>
              
              <div className="form-group mt-3">
                <button type="submit" className="form-control btn btn-dark btn-block mt-1"> Edit </button>
              </div>
            </div>
            )}

            {/* check if the registration request is successful, and if not print corresponding message */}
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
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>    
        </div>
    </div>
    );
}

export default EditAuction;