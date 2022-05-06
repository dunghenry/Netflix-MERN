import React from 'react'
import './featured.scss';
import { Link } from "react-router-dom";
import axios from 'axios';
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
const Featured = ({ type, setGenre}) => {
  const [content, setContent] = React.useState({});
  React.useEffect(() => {
    const getRandomMovie = async () => {
      try {
        const response = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzEyNzJkOTEyNzM4ZWJmZjI4MDg1OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgwODA1MCwiZXhwIjoxNjUxODk0NDUwfQ.niknA7HgSd9dBxFINw9kPsrZMqsC-ja8U9A67UFiScY"
          }
        })
        setContent(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    getRandomMovie();
  }, [type]);
  return (
    <div className="featured">
      {type && (<div className="category">
        <span>{type === "movies" ? "Movies" : "Series"}</span>
        <select
          name="genre"
          id="genre"
          onChange={(e) => setGenre(e.target.value)}
        >
          <option>Genre</option>
          <option value="adventure">Adventure</option>
          <option value="comedy">Comedy</option>
          <option value="crime">Crime</option>
          <option value="fantasy">Fantasy</option>
          <option value="historical">Historical</option>
          <option value="horror">Horror</option>
          <option value="romance">Romance</option>
          <option value="sci-fi">Sci-fi</option>
          <option value="thriller">Thriller</option>
          <option value="western">Western</option>
          <option value="animation">Animation</option>
          <option value="drama">Drama</option>
          <option value="documentary">Documentary</option>
        </select>
      </div>)}
      <img src={content.img} alt="" />
       <div className="info">
        <img src="https://store-images.s-microsoft.com/image/apps.23125.9007199266246365.fc3e1dac-58ff-4db5-9d08-4cca1b6f53e3.17521874-b534-4c18-afe3-12edb124dda8" alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <Link to={{ pathname: "/watch", movie: content}}>
               <span>Play</span>
             </Link>
           
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Featured;