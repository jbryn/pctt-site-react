import "./styles/App.scss";
import Nav from "./components/Nav";
import Player from "./components/Player";
import { useEffect, useState } from "react";
import { request } from "graphql-request";
// require("dotenv").config();

function App() {
  const [offSetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      const { tracks } = await request(
        process.env.REACT_APP_API_ENDPOINT,
        `
              {
          tracks {
            id
            title
            cover {
              url
            }
            author
            audio {
              url
            }
          }
        }
    `
      );
      setTracks(tracks);
    };
    fetchTracks();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log(offSetY);
  }, [offSetY]);

  return (
    <div className="app">
      <Nav />
      {tracks && <Player tracks={tracks} />}
      <p>{JSON.stringify(tracks)}</p>
    </div>
  );
}

export default App;
