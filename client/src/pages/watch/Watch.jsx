import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation, useParams } from "react-router-dom";
import "./watch.scss";
import video from "../../videos/video_01.mp4"
export default function Watch() {
  const location = useLocation();
  const movie = location.movie;
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          &nbsp;Home
        </div>
      </Link>
      <video className="video" autoPlay progress="true" controls src={video} />
    </div>
  );
}