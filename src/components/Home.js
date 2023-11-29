import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CountryList from "./CountryList";
import Loading from "./Loading";
import "../assets/styles/Home.css";

const Home = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const GetData = async () => {
      setLoading(true);
      const BASE_URL = `https://restcountries.com/v3.1/all`;
      const response = await axios
        .get(`${BASE_URL}`)
        .catch((error) => console.log("Error Occurred"));
      setData(response.data);
      setLoading(false);
    };
    GetData();
  }, []);

  // Searching Country Names
  const searchData = data.filter(
    (data) =>
      data.name.common.toLowerCase().includes(search.toLocaleLowerCase()) ||
      data.name.official.toLowerCase().includes(search.toLowerCase()) ||
      data.cca2.toLowerCase().includes(search.toLowerCase()) ||
      data.cca3.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Search">
      {location.pathname === '/' && (
        <div className="notice-container">
          <p className="notice-text">Scroll down to explore and search for countries!</p>
          <div className="centered-container">
            <h2 className="country-info">Welcome to the Country Information App!</h2>
            <p className="info-text">I'm ready to help you explore. Could you type the name of <br/> the country down below that you'd like to get information.</p>
          </div>
        </div>
      )}
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsTyping(true);
          }}
        />
      </div>
      <div className="flex-wrap d-flex align-item-center justify-content-center">
        {!loading ? (
          (isTyping && search !== '' && searchData.length > 0) ? (
            searchData.map((item) => (
              <CountryList key={item.name.common} info={item} />
            ))
          ) : (
            (isTyping && search !== '' && <p>No matching countries found.</p>)
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Home;
