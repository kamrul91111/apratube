import React, {useState, useEffect} from "react";
import "./home.css";
import axios from "axios";
import Lottie from "react-lottie-player";
import TextField from "@mui/material/TextField";

// lottie animation
import loader from "../../assets/lottie/loader.json";

// api url
import {jsonApiUrl} from "../../api/baseUrl";

// mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";

// icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

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

  //   load previous page
  const goBack = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    } else return null;
  };

  //   load next page
  const getMore = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div className="home-container">
      {/* while loading, show lottie, else render table */}
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
        <div className="data-container">
          {/*searchbar  */}
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            fullWidth
          />
          {/* render table for data */}
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Thumbnail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* map through data and render cells */}
                {data.map((item: photoData, index: number) => (
                  <TableRow
                    //   alternate tablecell colors using index
                    style={{
                      backgroundColor: index % 2 === 0 ? "#e8fbe8" : "white",
                    }}
                    key={item.id}
                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.title}
                    </TableCell>
                    <TableCell align="right">
                      <img src={item.thumbnailUrl} alt={item.title} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* buttons */}
          <div className="buttons-container">
            <IconButton
              color="primary"
              aria-label="load previous data"
              component="span"
              onClick={goBack}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="load more"
              component="span"
              onClick={getMore}
            >
              <NavigateNextIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
