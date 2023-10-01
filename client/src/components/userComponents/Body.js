import RestaurantCard from "./RestaurantCard";
// import { restaurantData } from "../constants/constants";
import { useEffect, useState } from "react";
import "./app.css";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const filtering = (text, data) => {
  const filteredData = data.filter((ite) => {
    const item = ite.data.area.toLowerCase().includes(text.toLowerCase())
    return item.data.name.toLowerCase().includes(text.toLowerCase());
  });
  return filteredData;
};

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [restaurants, setRestaurant] = useState([]);
  // const [clicked,setClicked] = useState("false")
  useEffect(() => {
    getRestaurants();
  }, []);
  const getRestaurants = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=9.9312328&lng=76.26730409999999&page_type=DESKTOP_WEB_LISTING"
    );
    const jsonData = await data.json();
    console.log(jsonData);
    setRestaurant(jsonData.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurant(jsonData.data?.cards[2]?.data?.data?.cards);
  };

  if (!restaurants) return null;

  return restaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div>
        <input
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          className="SearchText"
          value={searchText}
          placeholder="Search"
        />
        <button
          onClick={() => {
            // setClicked(clicked === 'true'? "false" : "true")
            const data = filtering(searchText, restaurants);
            setFilteredRestaurant(data);
          }}
        >
          {" "}
          Search
        </button>
      </div>
      <div className="cardsBodyOne">
        <div className="cardsBody">
          {filteredRestaurant.length == 0 ? (
            <h3>No search data</h3>
          ) : (
            filteredRestaurant.map((res) => {
              return (
                <Link key={res.data.id} to={"/restaurant/" + res.data.id}>
                  <RestaurantCard {...res.data}  />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Body;
