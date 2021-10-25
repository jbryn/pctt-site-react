import { useEffect, useRef, useState } from "react";
import { GrPause, GrPlay } from "react-icons/gr";
import { IoPlayOutline } from "react-icons/io5";
import { TiMediaPauseOutline } from "react-icons/ti";
import { IconContext } from "react-icons";

const CustomIcon = ({ icon }) => {
  return (
    <IconContext.Provider
      value={{ color: "white", size: "30px", style: { margin: "10px" } }}
    >
      <div>{icon}</div>
    </IconContext.Provider>
  );
};

const Player = ({ tracks }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { title, cover, author, audio } = tracks[trackIndex];
  const audioRef = useRef(new Audio(audio.url));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const toPrevTrack = () => {
    console.log("TODO go to prev");
  };

  const toNextTrack = () => {
    console.log("TODO go to next");
  };

  return (
    <div className="player">
      <div className="track-info">
        <CustomIcon icon={<IoPlayOutline />} />
        <CustomIcon icon={<TiMediaPauseOutline />} />
        <img className="cover" src={cover.url} alt="track cover" />
        <h2 className="title">{title}</h2>
        <h2 className="author">{author}</h2>
      </div>
    </div>
  );
};

export default Player;
