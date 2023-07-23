import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import RestaurantSuggestions from "./RestaurantSuggestions";
import Restaurant from "./Restaurant";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<RestaurantSuggestions />} />
        <Route path="/restaurant" element={<Restaurant />} />
      </Routes>
    </Router>
  );
}

export default App;
