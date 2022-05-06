import React from 'react'
import './listItem.scss';
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import video from '../../videos/video_01.mp4';
import axios from 'axios';
const ListItem = ({ item, index }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [movie, setMovie] = React.useState({});
  React.useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.get("/movies/" + item, {
          headers: {
            token:
            "Bearer "+ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzEyNzJkOTEyNzM4ZWJmZjI4MDg1OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgwODA1MCwiZXhwIjoxNjUxODk0NDUwfQ.niknA7HgSd9dBxFINw9kPsrZMqsC-ja8U9A67UFiScY",
          },
        });
        setMovie(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);
  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie?.imgSm} alt="" />
        {isHovered && (
          <>
            <video src={video} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <h3>Title : {movie.title}</h3>
                <span>Duration : {item.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">Description : {movie.desc}</div>
              <div className="genre">Gener : {movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}

export default ListItem