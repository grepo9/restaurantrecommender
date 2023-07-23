import React from "react";
import { useLocation } from "react-router-dom";

function Restaurant() {
  const location = useLocation();
  console.log("location:", location);
  console.log("location state", location.state)
  console.log("location hash",location.hash)
  console.log(Object.keys(location))
  

  if (!location || !location.state) {
    return null;
  }

  const { name, image_url, location: restaurantLocation, rating, review_count } = location.state;

  return (
    <div>
      <h1>{name}</h1>
      <img src={image_url} alt={name} />
      <p>
        {restaurantLocation.address1}, {restaurantLocation.city}, {restaurantLocation.state} {restaurantLocation.zip_code}
      </p>
      <p>Rating: {rating} ({review_count} reviews)</p>
    </div>
  );
}

export default Restaurant;
