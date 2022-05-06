import React from 'react'
import './home.scss';
import axios from 'axios'
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
const Home = ({ type }) => {
  const [lists, setLists] = React.useState([]);
  const [genre, setGenre] = React.useState(null);
  React.useEffect(() => {
    const getRandomLists = async () => {
      try {
        const response = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
          headers: {
            token: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzEyNzJkOTEyNzM4ZWJmZjI4MDg1OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgwODA1MCwiZXhwIjoxNjUxODk0NDUwfQ.niknA7HgSd9dBxFINw9kPsrZMqsC-ja8U9A67UFiScY"
          }
        });
        setLists(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRandomLists()
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre}/>
      {lists.map((list, i) => (
        <List key={i} list={list} />
      ))}
    </div>
  )
}

export default Home;