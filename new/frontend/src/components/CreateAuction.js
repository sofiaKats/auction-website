import React, { useState }  from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { FormGroup } from "react-bootstrap";

const CreateAuction = () => {

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [isChecked, setIsChecked] = useState(false);


  const onChangeItemName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeLocation = (e) => {
    const location = e.target.value;
    setLocation(location);
  };

  const onChangeCountry = (e) => {
    const country = e.target.value;
    setCountry(country);
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <Form >
          <h3 className="Auth-form-title">Create Auction</h3>
            <div>
              <div className="form-group mt-3">
                <label>Item Name</label>
                <Input type="text" className="form-control mt-1" placeholder="Item Name" value={name} onChange={onChangeItemName} required />
              </div>

              <FormGroup>
                <label>
                    <label htmlFor="mpinput">Would you like to add a Buy Price? Check box if yes.</label>
                    <Input type="checkbox" id="mpCheckbox" onChange={(e) => setIsChecked(e.target.checked)} />
                    <Input type="text" name="pmInput" id="pmInput" disabled={isChecked} />
                </label>
            </FormGroup>

              <div className="form-group mt-3">
                <label>Location</label>
                <Input type="text" className="form-control mt-1" placeholder="Location" value={location} onChange={onChangeLocation} required />
              </div>
              <div className="form-group mt-3">
                <label>Country</label>
                <Input type="text" className="form-control mt-1" placeholder="Country" value={country} onChange={onChangeCountry} required />
              </div>
              <div className="form-group mt-3">
                <label>Description</label>
                <Input type="text" className="form-control mt-1" placeholder="Description" value={description} onChange={onChangeDescription} required />
              </div>
              
              <div className="form-group mt-3">
                <button type="submit" className="form-control btn btn-dark btn-block mt-1"> Submit</button>
              </div>
            </div>

          <CheckButton style={{ display: "none" }} />
        </Form>
      </div>
    </div>
  );
};

export default CreateAuction;