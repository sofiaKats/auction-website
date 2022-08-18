import React from "react";

// , { useState, useEffect }
// import TestService from "../services/test.service";
// import EventBus from "../common/EventBus";

const BoardUser = () => {
  // const [content, setContent] = useState("");

  // useEffect(() => {
  //   TestService.getUserBoard().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();

  //       setContent(_content);

  //       if (error.response && error.response.status === 401) {
  //         EventBus.dispatch("logout");
  //       }
  //     }
  //   );
  // }, []);

  return (
    <div className="BoardUser-container lineUp">
      {/* <header className="jumbotron">
        <h3>{content}</h3>
      </header> */}
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-3">Welcome to Auction Bay!</h1>
          <p>We are an e-commerce company based in Athens Greece, facilitating consumer-to-consumer and business-to-consumer sales through our website.</p>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h2>Introduction</h2>
            <p>Businesses adopt different strategies to get maximum results by offering their customer base what they are interested in. A prominent model of sale is through auctions, where you set a base price for a product, and users will place bids by gradually raising the price of the product.</p>
          </div>
          <div class="col-md-4">
            <h2>Create Auction</h2>
            <p> Setting up an auction sales model on Auction Bay is not very difficult, thanks to several interesting features. The pages above offers several advanced features that will help you create a unique auction listing. </p>
          </div>
          <div class="col-md-4">
            <h2>Buy and Sell Products</h2>
            <p>A fast, and scalable platform to sell or buy products. We use the latest technology so that you can easily and conveniently bid in auctions across the world from the comfort of your own home.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardUser;
