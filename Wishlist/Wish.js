import React, { useState, useContext } from "react";
import Heart from "react-heart";
import { Link } from "react-router-dom";
import { Card, Image, Icon } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import ErrorModal from "../Modal/ErrorModal";
import { useHttpClient } from "../hooks/http-hook";
import Button from "../FormElements/Button";
import "./Wish.css";

const Wish = (props) => {
  console.log(props);
  const [wishstate, setWishstate] = useState(props.wishlist || false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { isLoggedIn, getwishlist, userId } = useContext(AuthContext);
  const wishListHandler = async () => {
    const userID = JSON.parse(localStorage.getItem("userData")).userId;
    if (!wishstate) {
      console.log(userID);
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/wishlist`,
          "POST",
          JSON.stringify({
            creator: userID,
            wishlistid: props.id,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        getwishlist(responseData.wishlist);
        setWishstate((prev) => !prev);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/wishlist`,
          "PATCH",
          JSON.stringify({
            creator: userID,
            wishlistid: props.id,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        getwishlist(responseData.wishlist);
        setWishstate((prev) => !prev);
      } catch (err) {}
    }
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div id="head"> WISHLIST </div>
      <div id="card">
        <link
            async
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />  
        {/* <img src={props.image} alt={props.name} />
        <div className="Title">{props.name}</div>
        {props.lprice} eth - {props.hprice} eth
        <br />
        <Link to={`${props.id}/item`} style={{ "text-decoration": "none" }}>
          <Button>View</Button>
        </Link> */}
        <Card>
          <img src={props.image}/>
          <Card.Content>
            <a><Icon name='trash' floated='right' labelPosition="right" /></a>
            <Card.Header>BOWL</Card.Header>
            <Card.Meta>
              <span className='price'>200 eth - 500 eth</span>
            </Card.Meta>
            <Card.Description>
              It's a Bone China BOWL.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='heart' />
              22 Wishes
            </a>
            <br />
            <a>
              <Icon name='shopping bag' />
              Add to Bag
            </a>
          </Card.Content>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Wish;