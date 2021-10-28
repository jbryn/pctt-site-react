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

  // useEffect(() => {
  //   console.log(offSetY);
  // }, [offSetY]);

  return (
    <div className="app">
      <Nav />
      {tracks && <Player tracks={tracks} />}
      <div
        className="background"
        style={{ transform: `translateY(${offSetY * 0.5}px)` }}
      >
        <p>{JSON.stringify(tracks)}</p>
      </div>
      {/* <section className="covers">
        {tracks.map((track) => {
          return (
            <div className="cover">
              <img alt={track.title} src={track.cover.url} />
            </div>
          );
        })}
      </section> */}
      <img className="garbage" alt="garbage" src={"./bd_sie_krecic.png"} />
    </div>
  );
}

export default App;
