import React from "react";
import axios from "axios";

class RestaurantSuggestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
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

  render() {
    return (
      <div>
        <h1>Restaurant Suggestions:</h1>
        <div className="restaurant-grid">
          {this.state.restaurants.map((restaurant) => (
            <div className="restaurant-container" key={restaurant.id}>
              <img src={restaurant.image_url} alt={restaurant.name} />
              <p>{restaurant.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RestaurantSuggestions;
