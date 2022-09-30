import React from "react";

const BoardUser = () => {
  return (
    <div className="BoardUser-container lineUp">
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">Welcome to Auction Bay!</h1>
          <p>We are an e-commerce company based in Athens Greece, facilitating consumer-to-consumer and business-to-consumer sales through our website.</p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>Introduction</h2>
            <p>Businesses adopt different strategies to get maximum results by offering their customer base what they are interested in. A prominent model of sale is through auctions, where you set a base price for a product, and users will place bids by gradually raising the price of the product.</p>
          </div>
          <div className="col-md-4">
            <h2>Create Auction</h2>
            <p> Setting up an auction sales model on Auction Bay is not very difficult, thanks to several interesting features. The pages above offers several advanced features that will help you create a unique auction listing. </p>
          </div>
          <div className="col-md-4">
            <h2>Buy and Sell Products</h2>
            <p>A fast, and scalable platform to sell or buy products. We use the latest technology so that you can easily and conveniently bid in auctions across the world from the comfort of your own home.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardUser;
