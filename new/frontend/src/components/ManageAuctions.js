import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuctionService from "../services/auction.service";

const ManageAuctions = () => {

  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams();  //fetch id parameter from url

  useEffect(() => {
    AuctionService.getAllItems(id).then(
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

          // if (error.response && error.response.status === 401) {
          //         EventBus.dispatch("logout");
          //       }
      }
    )
  }, [id]);

  return (
    <div className="manage-auctions">
      <Link to = "/add-auction" className = "btn btn-custom btn-light mb-2" > Add New Auction </Link>
      <div className="message">
          <h3>{message}</h3>
      </div>

      <div className="row">
      {
        items.map((item, index)=> (
          <div className="column" key = {index}>
            <div className="card">
              <h3>{item.name}</h3>
              <p>Current Highest Bid: {item.currently} $</p>
              <p>by user: {item.user_id}</p>
              <p>{item.longitude}</p>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default ManageAuctions;