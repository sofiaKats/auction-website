import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuctionService from "../services/auction.service";

const ManageAuctions = () => {

  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    AuctionService.getAllItems().then(
      (response) => {
        //calculate size of response data
        var count = Object.keys(response.data).length;
        // console.log("ITEMS:!!!", items);
        // if (console.count(response.data)) {
        if (count) {
          console.log('MPHKAA!!');
          setMessage(" ");
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
  }, []);

  return (
    <div className="manage-auctions">
      <Link to = "/add-auction" className = "btn btn-custom btn-light mb-2" > Add New Auction </Link>
      <div className="message">
          <h3>{message}</h3>
      </div>
      <div className="row">
        {
          items.map(item => (
            <div className="column">
              <div className="card">
                <h3>{item.Name}</h3>
                <p>{item.Currently}</p>
                <p>Some text</p>
              </div>
            </div>
          ))
        }
      </div>
      {/* <div className="row">
        <div className="column">
          <div className="card">
            <h3>Card 1</h3>
            <p>Some text</p>
            <p>Some text</p>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <h3>Card 2</h3>
            <p>Some text</p>
            <p>Some text</p>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <h3>Card 3</h3>
            <p>Some text</p>
            <p>Some text</p>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <h3>Card 4</h3>
            <p>Some text</p>
            <p>Some text</p>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <h3>Card 5</h3>
            <p>Some text</p>
            <p>Some text</p>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <h3>Card 6</h3>
            <p>Some text</p>
            <p>Some text</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ManageAuctions;