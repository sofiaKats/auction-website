import React from "react";
// , { useState, useEffect }
// import TestService from "../services/user.service";

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
    </div>
  );
};

export default Home;
