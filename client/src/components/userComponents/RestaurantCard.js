import { ImageURL } from "../../constants/constants"
import "./app.css";

const RestaurantCard = ({
    name,
    area,
    totalRatingsString,
    cloudinaryImageId,
  }) => {
   
    return (
      <div className="card">
        <img
          src={ ImageURL+ cloudinaryImageId }
        ></img>
        <h3>{name}</h3>
        <h4>{area}</h4>
        <p>{totalRatingsString}</p>
      </div>
    );
  };

  export default RestaurantCard