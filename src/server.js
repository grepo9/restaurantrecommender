const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const app = express();

const yelpApiKey = "-52S_yTCwLsqR9SH36zGwNu9KojsOYgILhQYsFCPnnXzQuFH0XxFB5rpu9an8t75zAxcBMYukyksB2hgpoCzzquA8kk-GH4adwC4wIC1EXJwZEZh6UuhI0szk1YyZHYx";
const yelpEndpoint = "https://api.yelp.com/v3/businesses/search";

// enable cors
app.use(cors({ origin: "http://localhost:3000" }));

// endpoint to fetch restaurant suggestions
app.get("/api/restaurants", async (req, res) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${yelpApiKey}`,
      },
      params: {
        term: "restaurants",
        location: "New York, NY",
        radius: 1609,
        sort_by: "rating",
        limit: 50,
      },
    };
    const response = await axios.get(yelpEndpoint, config);
    res.send(response.data.businesses);
  } catch (error) {
    console.error("Error fetching Yelp data:", error);
    res.status(500).send("Error fetching restaurant data");
  }   
});

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
