import "./styles/App.scss";
import Nav from "./components/Nav";
import Player from "./components/Player";
import { useEffect, useState } from "react";

function App() {
  const [offSetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

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
      <Player />
    </div>
  );
}

export default App;
