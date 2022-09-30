import React, { useState, useRef} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useParams } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import { FormGroup } from "react-bootstrap";
import AuctionService from "../services/auction.service";

const CreateAuction = () => {
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

  const { id } = useParams();  //fetch user_id parameter from url

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

  const handleAuction  = id=> event=> {
    event.preventDefault();
    // console.log("ID IS: ", id);

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    //if all the input is given by the user
    if (checkBtn.current.context._errors.length === 0) {
      //call axios function, if everything works fine then send the saveUser request
      //else catch exception and print message
      AuctionService.addAuction(
        name,
        buyPrice,
        location,
        country,
        description,
        id,
        category, 
        latitude,
        longitude, 
      ).then(
        (response) => {
          setMessage("Auction Listing Created Successfully!");
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
      <Form onSubmit={handleAuction(id)} ref={form}>
          <h3 className="Auth-form-title">Create Auction</h3>
          {!successful && (
            <div>
              <div className="form-group mt-3">
                <label>Item Name</label>
                <Input type="text" className="form-control mt-1" placeholder="Item Name" value={name} onChange={onChangeItemName} required />
              </div>
              <div className="form-group mt-3">
                <FormGroup>
                <label>Buy Price</label>
                <Input type="number" name="pmInput" id="pmInput" className="form-control mt-1" placeholder="Buy Price"  value={buyPrice} onChange={onChangeBuyPrice} required disabled={isChecked} />
                <label htmlFor="mpinput">Would you like to skip adding a Buy Price? Check box if yes.</label>
                <Input type="checkbox" id="mpCheckbox" onChange={(e) => setIsChecked(e.target.checked)} />
              </FormGroup>
              </div>
              <div className="form-group mt-3">
                <label>Location</label>
                <Input type="text" className="form-control mt-1" placeholder="Location" value={location} onChange={onChangeLocation} required />
              </div>
              <div className="form-group mt-3">
                <label>Country</label>
                <Input type="text" className="form-control mt-1" placeholder="Country" value={country} onChange={onChangeCountry} required />
              </div>
              <div className="form-group mt-3">
                <FormGroup>
                <label>Latitude</label>
                <Input type="text" name="pmInput" id="pmInput" className="form-control mt-1" placeholder="Latitude"  value={latitude} onChange={onChangeLatitude} required disabled={isChecked2} />
                <label>Longitude</label>
                <Input type="text" name="pmInput" id="pmInput" className="form-control mt-1" placeholder="Longitude"  value={longitude} onChange={onChangeLongitude} required disabled={isChecked2} />
                <label htmlFor="mpinput">Would you like to skip adding Latitude and Longitude? Check box if yes.</label>
                <Input type="checkbox" id="mpCheckbox" onChange={(e) => setIsChecked2(e.target.checked)} />
              </FormGroup>
              </div>
              <div className="form-group mt-3">
                <label>Category</label>
                <label>Separate more than one categories with comma.</label>
                <label className="create-auction-label">two or more words separated by space and not comma `,` will count as one category. (e.g denim jeans ).</label>
                <Input type="text" className="form-control mt-1" placeholder="Category" value={category} onChange={onChangeCategory} required />
              </div>
              <div className="form-group mt-3">
                <label>Description</label>
                <Input type="text" className="form-control mt-1" placeholder="Description" value={description} onChange={onChangeDescription} required />
              </div>
              
              <div className="form-group mt-3">
                <button type="submit" className="form-control btn btn-dark btn-block mt-1"> Submit</button>
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
};

export default CreateAuction;