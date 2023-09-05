const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const app = express();

const yelpApiKey = "-52S_yTCwLsqR9SH36zGwNu9KojsOYgILhQYsFCPnnXzQuFH0XxFB5rpu9an8t75zAxcBMYukyksB2hgpoCzzquA8kk-GH4adwC4wIC1EXJwZEZh6UuhI0szk1YyZHYx";
const yelpEndpoint = "https://api.yelp.com/v3/businesses/search";

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/api/restaurants", async (req, res) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${yelpApiKey}`,
      },
      params: {
        term: "restaurants",
        location: "Campbell, CA",
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

app.get("/api/recommendations", async (req, res) => {
  try {
    const predictions = JSON.parse(req.query.predictions);
    const recommendations = [];

    for (const businessId of predictions) {
      const config = {
        headers: {
          Authorization: `Bearer ${yelpApiKey}`,
        },
      };
      const response = await axios.get(`https://api.yelp.com/v3/businesses/${businessId}`, config);

      console.log("Yelp API Response:", response.data);

      const { name, image_url, location, rating, review_count } = response.data;

      recommendations.push({
        name,
        image_url,
        location,
        rating,
        review_count
      });
    }

    console.log("Recommendations:", recommendations);

    res.json(recommendations);
  } catch (error) {
    console.error("Error fetching restaurant recommendations:", error);
    res.status(500).send("Error fetching restaurant recommendations");
  }
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
