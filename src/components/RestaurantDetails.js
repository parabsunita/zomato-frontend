import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      await axios
        .get(
          `http://localhost:3000/api/restaurant/restaurant/findResturant/${restaurantId}`
        )
        .then((response) => {
          setRestaurant(response.data);
        })
        .catch((error) => {
          console.error("Error fetching restaurant data:", error);
        });
    };

    fetchRestaurantData();
  }, [restaurantId]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Restaurant Details</h2>
      <div>
        <strong>Name:</strong> {restaurant.name}
      </div>
      <div>
        <strong>User ID:</strong> {restaurant.user_id}
      </div>
      <div>
        <strong>Location:</strong> {restaurant.location.type} (
        {restaurant.location.coordinates.join(", ")})
      </div>
      <div>
        <strong>Contact:</strong> {restaurant.contact}
      </div>
      <div>
        <strong>Email:</strong> {restaurant.email}
      </div>
      <div>
        <strong>Address:</strong> {restaurant.address}
      </div>
      <div>
        <strong>Cuisines:</strong> {restaurant.cuisines}
      </div>
      {/* <div>
        <strong>Timeslot:</strong> {restaurant.timeslot[0].startTime} to{" "}
        {restaurant.timeslot[0].endTime}
      </div> */}
      <div>
        <strong>Opening Days:</strong> {restaurant.opening_days.join(", ")}
      </div>
      <div>
        <strong>Approval Status:</strong> {restaurant.approval_status}
      </div>
      <div>
        <strong>Restaurant Images:</strong> {restaurant.resturant_images}
      </div>
      <div>
        <strong>Food Images:</strong> {restaurant.food_images}
      </div>
      <div>
        <strong>Rejection Reason:</strong> {restaurant.rejection_season}
      </div>
    </div>
  );
};

export default RestaurantDetails;
