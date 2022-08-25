import React, { useState, useEffect } from "react";
import AuctionService from "../services/auction.service";
import { Link } from "react-router-dom";

const Home = () => {
  // const [content, setContent] = useState("");

  // useEffect(() => {
  //   TestService.getPublicContent().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response && error.response.data) ||
  //         error.message ||
  //         error.toString();

  //       setContent(_content);
  //     }
  //   );
  // }, []);
  const [items, setItems] = useState([]);
  const [is_active, setIs_active] = useState("");

  useEffect(() => {
    AuctionService.getAllActiveItems().then(
      (response) => {
        //calculate size of response data
        var count = Object.keys(response.data).length;
        if (count) {
          setItems(response.data);
          if(items.isActive) setIs_active("true");
          else setIs_active("false");
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
  }, [items]);

  return (
    <div className="container">
      {/* <header className="jumbotron">
        <h3>{content}</h3>
      </header> */}
      <div className='WelcomePage'>     
          <p>Ultimate Trading Experience</p>
            <span>
                <h2>Simple. Free. A fast, and scalable platform to sell or buy products. We use the latest technology so that you can easily and conveniently bid in auctions across the world from the comfort of your own home.</h2>
            </span>
        </div>
        {/* <Footer /> */}
        <div className="manage-auctions">
          <div className="row">
          {
            items.map((item, index)=> (
              <div className="column" key = {index}>
                <div className="card-custom">
                  {/* <img src="img_avatar.png" alt="Avatar" style="width:100%"> */}
                  <h3>{item.name}</h3>
                  <p>Current Highest Bid: {item.currently} $</p>
                  <p>Is Listing Active?: {is_active}</p>
                  <div className="form-group mt-3">
                    <Link to={`/auction-details/${item.id}`} className = "form-control btn btn-dark btn-block mt-1" > View Details </Link>
                  </div>
                </div>
              </div>
            ))
          }
          </div>
        </div>
    </div>
  );
};

export default Home;
