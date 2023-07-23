import React from "react";
import axios from "axios";
import Restaurant from "./Restaurant";
import { Link, useLocation } from "react-router-dom";

class RestaurantSuggestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      showNewPage: false
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:5000/api/restaurants");
      const data = response.data;
      this.setState({ restaurants: data });
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  }

  handleImageClick = () => {
    this.setState({ showNewPage: true });
  };

  render() {
    
    return (
      <div>
        <h1>Restaurant Suggestions</h1>
        <div className="restaurant-grid">
          {this.state.restaurants.map((restaurant) => {
            console.log(restaurant);
            return (
              <div className="restaurant-container" key={restaurant.id}>
                <p className="restaurant-title">{restaurant.name}</p>
                <Link to={{ pathname: "/restaurant" }} state={restaurant}>
                  <img
                    className="restaurant-image"
                    src={restaurant.image_url}
                    alt={restaurant.name}
                    onClick={this.handleImageClick}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
    
  }
}

export default RestaurantSuggestions;
