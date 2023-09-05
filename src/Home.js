import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import loadingSpinner from '../src/images/loading.gif'
import './Home.css'; 
import LoadingPopup from './LoadingPopup'; 


function Home() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    console.log('Making API call to /predict...');
    fetch('http://127.0.0.1:5000/predict')
      .then(response => response.json())
      .then(data => {
        console.log('Predictions:', data);
        fetchRecommendations(data);
      })
      .catch(error => console.log(error));
  }, []);

  const fetchRecommendations = (predictions) => {
    const predictionsQueryParam = JSON.stringify(predictions);

    fetch(`http://localhost:5000/api/recommendations?predictions=${predictionsQueryParam}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Recommendations:', data);
        setRecommendations(data);
        setLoading(false); 
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Predicted Suggestions</h1>

      <LoadingPopup isOpen={loading} />

      {!loading && (
        <div>
          <div className="restaurant-grid">
            {recommendations.map((restaurant) => (
              <div className="predicted_restaurant-container" key={restaurant.id}>
                <p className="restaurant-title">{restaurant.name}</p>
                <Link to={{ pathname: "/restaurant" }} state={restaurant}>
                  <img className="restaurant-image" src={restaurant.image_url} alt={restaurant.name} />
                </Link>
                <p>Rating: {restaurant.rating}</p>
                <p>
                  {restaurant.location.address1}, {restaurant.location.city}, {restaurant.location.state}{' '}
                  {restaurant.location.zip_code}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
