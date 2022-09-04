import React, { useState, useRef, useEffect} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useParams } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import { FormGroup } from "react-bootstrap";
import AuctionService from "../services/auction.service";
import AuthService from "../services/auth.service";

function Bid() {
    const form = useRef();
    const checkBtn = useRef();

    const [bids, setBids] = useState([]);
    // const [userInfo, setUserInfo] = useState("");
    const [amount, setAmount] = useState("");
    const [username, setUsername] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const { item_id, user_id } = useParams();  //fetch user_id and item_id parameter from url

    const onChangeAmount = (e) => {
        const amount = e.target.value;
        setAmount(amount);
      };

    useEffect(() => {
      // whenever a user bids, we want their username to be stored
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) { 
            setUsername(currentUser.username);
        }

        // console.log('item_id params:', item_id);
        // console.log('user_id params', user_id);
        // display all bids made for this product
        AuctionService.getAllBids(item_id)
        .then(response => {
            setBids(response.data);
        })
        .catch(error => {
            console.log('Something went wrong', error);
        })

      }, [item_id, user_id, bids]);

      const handlePlaceBid  = (e) => {
        e.preventDefault();
    
        setMessage("");
        setSuccessful(false);

        form.current.validateAll();
        //if all the input is given by the user, and amount is not null
        if ((checkBtn.current.context._errors.length === 0) && amount) {
          AuctionService.addBid (
            amount,
            item_id,
            user_id,
            username
          ).then(
            (response) => {
              setMessage("Bid Placed Successfully!");
              setSuccessful(true);
              window.location.reload();
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
        <div>
            {/* BIDDING FORM */}
            <div className="Auth-form-container">
            <div className="Auth-form">
            <Form onSubmit={handlePlaceBid} ref={form}>
                <h3 className="Auth-form-title">Bid</h3>
                {!successful && (
                    <div className="form-group mt-3">
                      <FormGroup>
                        <label>Amount</label>
                        <Input type="number" name="pmInput" id="pmInput" className="form-control mt-1" placeholder="Amount"  value={amount} onChange={onChangeAmount} disabled={!isChecked} required />
                        <label htmlFor="mpinput">Would you like to place a bid? Check box if yes. <b> Warning!</b> Action is irreversible!</label>
                        <Input type="checkbox" id="mpCheckbox" onChange={(e) => setIsChecked(e.target.checked)} />
                        <button type="submit" className="form-control btn btn-dark btn-block mt-1"> Submit Bid </button>
                      </FormGroup>
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
            {/* LIST OF BIDS DISPLAYED */}
            </div>
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
        </div>
    );
}

export default Bid;