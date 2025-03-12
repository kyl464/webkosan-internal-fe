import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import SearchBar from "../components/SearchBar";
const Home = () => {
  return (
    <div className="relative">
      <Navbar />
      <Carousel />
      <SearchBar />
    </div>
  );
};
export default Home;
