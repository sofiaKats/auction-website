import React, { useState, useEffect } from "react";
import AuctionService from "../services/auction.service";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Pagination } from "@mui/material";

// pagination component customization
const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
      backgroundColor: '#a9aeb3',
    }
  }
}));

const Home = () => {
  const [items, setItems] = useState([]);
  // pagination component customization
  const classes = useStyles();
  // user can search anything included on a category, description or location
  const [searchAnything, setSearchAnything] = useState("");
  const [searchCategories, setSearchCategories] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];

  const onChangeSearchAnything = (e) => {
    const searchAnything = e.target.value;
    setSearchAnything(searchAnything);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const getRequestParams = (searchAnything, page, pageSize) => {
    let params = {};
    if (searchAnything) {
      params["description"] = searchAnything;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    return params;
  };

  const retrieveItems = () => {
    const params = getRequestParams(searchAnything, page, pageSize);
    // console.log("PARAMS!", params);

    AuctionService.getAllActivePagedItems(params)
      .then((response) => {
        const { items, totalPages } = response.data;

        setItems(items);
        setCount(totalPages);

        // console.log("DESCRIPTION:", searchDescription );
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const getAllCategories = useCallback( () => {
  //     AuctionService.getAllCategories()
  //     .then((response) => {
  //       setSearchCategories(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   }, [],);

  const SearchByCategory = (category) => {
    // setSearchAnything(category);
    
    const params = getRequestParams(category, page, pageSize);
    // console.log("PARAMS!", params);

    AuctionService.getAllActivePagedItems(params)
      .then((response) => {
        const { items, totalPages } = response.data;

        setItems(items);
        setCount(totalPages);

        // console.log("DESCRIPTION:", searchDescription );
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // useEffect(() => {
  //   AuctionService.getAllActiveItems().then(
  //     (response) => {
  //       //calculate size of response data
  //       var count = Object.keys(response.data).length;
  //       if (count) {
  //         setItems(response.data);
  //       }
  //     },
  //     (error) => {
  //       const _items =
  //       (error.response &&
  //       error.response.data &&
  //       error.response.data.message) ||
  //       error.message ||
  //       error.toString();

  //       console.log('Something went wrong', _items);

  //         // if (error.response && error.response.status === 401) {
  //         //         EventBus.dispatch("logout");
  //         //       }
  //     }
  //   )
    
  // }, [items]);

  // useEffect(retrieveItems, [searchAnything ,page, pageSize]);

  useEffect(() => {
    // search for items to be displayed on page
    const params = getRequestParams(searchAnything, page, pageSize);
    // console.log("PARAMS!", params);

    AuctionService.getAllActivePagedItems(params)
      .then((response) => {
        const { items, totalPages } = response.data;

        setItems(items);
        setCount(totalPages);

        // console.log("DESCRIPTION:", searchDescription );
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    // get all available categories from active listings
    AuctionService.getAllCategories()
    .then((response) => {
      setSearchCategories(response.data);
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
  }, [searchAnything ,page, pageSize]);


  return (
    <div className="container">
      <div className="list row">
        <div className="col-md-16">
          <div className="input-group mb-8">
              <div className="sec-center"> 	
                <input className="dropdown" type="checkbox" id="dropdown" name="dropdown"/>
                <label className="for-dropdown" htmlFor="dropdown">Search Categories <i className="uil uil-arrow-down"></i></label>
                <div className="section-dropdown"> 
                  {searchCategories &&
                      searchCategories.map((category, index) => 
                      <button key={index} className="uil uil-arrow-right" type="button" onClick={() => { SearchByCategory(category); }} >{category}</button>
                      )}
                </div>
            </div>
            <input type="text" className="form-control"
              placeholder="Search by Category, Description, Price or Location"
              value={searchAnything} onChange={onChangeSearchAnything} />
            <button className="btn btn-outline-secondary" type="button" onClick={retrieveItems} >Search</button>
            </div>
          </div>
        </div>
      <div className='WelcomePage'>     
          <p>Ultimate Trading Experience</p>
            <span>
                <h2>Simple. Free. A fast, and scalable platform to sell or buy products. We use the latest technology so that you can easily and conveniently bid in auctions across the world from the comfort of your own home.</h2>
            </span>
        </div>
        <div className="pages mt-3">
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination className="pagination my-3" count={count} page={page} classes={{ ul: classes.ul }}
            siblingCount={1} boundaryCount={1} variant="outlined" shape="rounded" onChange={handlePageChange} />
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
