import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImageURL } from "../../constants/constants";
import "./app.css";

const RestaurantDetails = () => {
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    getRestaurantDetails();
  }, []);
  const restId = useParams();
  const url =
    "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=9.9312328&lng=76.26730409999999&restaurantId=" +
    restId.id;
  const getRestaurantDetails = async () => {
    const data = await fetch(url);
    const jsonData = await data.json();
    setRestaurant(jsonData?.data?.cards[0]?.card?.card?.info);
    console.log(restaurant);
  };

  return (
    <>
      <div className="hotelBody">
        <div className="hotelHead">
          <div>
            <h2>Hotel Name : {restaurant?.name}</h2>
            {/* <img src={ImageURL + restaurant.cloudinaryImageId}></img> */}
            <h4>area :{`${restaurant?.city} , ${restaurant?.locality}`}</h4>
            <h4>cost : {restaurant?.costForTwoMessage}</h4>
            <p>{restaurant?.expectationNotifiers?.[0]?.text || ""}</p>
          </div>
          <div>
            <h3>Hotel rating : {restaurant?.avgRating}</h3>
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
};

export default RestaurantDetails;
