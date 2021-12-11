import React, {useState, useEffect} from "react";
import './home.css'
import axios from "axios";
import Lottie from "react-lottie-player";

// lottie animation
import loader from "../../assets/lottie/loader.json";

// api url
import {jsonApiUrl} from "../../api/baseUrl";

const Home = () => {
  const [data, setData] = useState<photoData[]>([]); //grab json api data
  const [pageNumber, setPageNumber] = useState<number>(1); // start from page number one
  const [loading, setLoading] = useState<boolean>(true); //for loading indicator

  // data type for api data
  interface photoData {
    albumId?: number;
    id?: number;
    title?: string;
    url?: string;
    thumbnailUrl?: string;
  }

  // load 4 objects per page
  useEffect(() => {
    axios
      .get(`${jsonApiUrl}/photos?_page=${pageNumber}&_limit=${4}`)
      .then(res => {
        setData(res.data); //grab data from api
        setLoading(false); //stop loading indicator
      })
      .catch(() => alert("Something went wrong. Please try again!"));
  }, [pageNumber]); // when page number changes, make the network request again with callback function

  return (
    <div className="home-container">
      {loading === true ? (
        <div>
          <Lottie
            loop
            animationData={loader}
            play
            style={{width: 550, height: 550}}
          />
        </div>
      ) : (
        <div>
          <span>henlo world</span>
        </div>
      )}
    </div>
  );
};

export default Home;
