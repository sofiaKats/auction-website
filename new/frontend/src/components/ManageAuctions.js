import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuctionService from "../services/auction.service";
import EventBus from "../common/EventBus";

const ManageAuctions = () => {

  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams();  //fetch user_id parameter from url

  useEffect(() => {
    AuctionService.getAllItemsWithUserId(id).then(
      (response) => {
        //calculate size of response data
        var count = Object.keys(response.data).length;
        // console.log("ITEMS:!!!", items);
        // if (console.count(response.data)) {
        if (count) {
          // console.log('MPHKAA!!');
          setMessage("Your Auctions:");
          setItems(response.data);
        }
        else {
          setMessage("You haven't created any auctions yet!");
        }
      },
      (error) => {
        const _items =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();

        console.log('Something went wrong', _items);

          if (error.response && error.response.status === 401) {
                  EventBus.dispatch("logout");
                }
      }
    )
  }, [id, items]);

  return (
    <div className="manage-auctions">
      <Link to={`/add-auction/${id}`} className = "btn btn-custom btn-light mb-2" > Add New Auction </Link>
      <div className="message">
          <h3>{message}</h3>
      </div>

      <div className="row">
      {
        items.map((item, index)=> (
          <div className="column" key = {index}>
            <div className="card-custom">
            {/* <img src="img_avatar.png" alt="Avatar" style="width:100%"> */}
              <h3>{item.name}</h3>
              <p>Current Highest Bid: {item.currently} $</p>
              <div className="form-group mt-3">
                <Link to={`/auction-details/${item.id}`} className = "form-control btn btn-dark btn-block mt-1" > View Details </Link>
              </div>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default ManageAuctions;