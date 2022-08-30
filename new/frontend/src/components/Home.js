import React, { useState, useEffect } from "react";
import AuctionService from "../services/auction.service";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Pagination } from "@mui/material";


const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff"
    }
  }
}));

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
  const classes = useStyles();

  useEffect(() => {
    AuctionService.getAllActiveItems().then(
      (response) => {
        //calculate size of response data
        var count = Object.keys(response.data).length;
        if (count) {
          setItems(response.data);
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
      <div className="list row">
        <div className="col-md-16">
          <div className="input-group mb-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Category, Description, Price or Location"
              // value={searchTitle}
              // onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                // onClick={this.retrieveTutorials}
              >
                Search
              </button>
              </div>
            </div>
          </div>
        </div>
      <div className='WelcomePage'>     
          <p>Ultimate Trading Experience</p>
            <span>
                <h2>Simple. Free. A fast, and scalable platform to sell or buy products. We use the latest technology so that you can easily and conveniently bid in auctions across the world from the comfort of your own home.</h2>
            </span>
        </div>
        <div className="mt-3">
          {"Items per Page: "}
          {/* <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select> */}

          <Pagination
            className="pagination my-3"
            // count={count}
            // page={page}
            classes={{ ul: classes.ul }}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            // onChange={handlePageChange}
          />
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
