import { useEffect, useRef, useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
import {
  TiMediaPauseOutline,
  TiMediaFastForwardOutline,
  TiMediaRewindOutline,
} from "react-icons/ti";
import { IconContext } from "react-icons";

const Player = ({ tracks }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { title, cover, author, audio } = tracks[trackIndex];
  const audioRef = useRef(new Audio(audio.url));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audio.url);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      // startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const toPrevTrack = () => {
    trackIndex - 1 < 0
      ? setTrackIndex(tracks.length - 1)
      : setTrackIndex(trackIndex - 1);
  };

  const toNextTrack = () => {
    trackIndex < tracks.length - 1
      ? setTrackIndex(trackIndex + 1)
      : setTrackIndex(0);
  };

  const PlayPauseButton = ({ icon, playing }) => {
    return (
      <div
        onClick={() => setIsPlaying(playing)}
        aria-label={playing ? "Play" : "Pause"}
      >
        <IconContext.Provider
          value={{
            color: "white",
            size: "30px",
            style: { margin: "10px", cursor: "pointer" },
          }}
        >
          <div>{icon}</div>
        </IconContext.Provider>
      </div>
    );
  };

  return (
    <div className="player">
      <div className="track-info">
        <TiMediaRewindOutline
          size="30px"
          style={{ margin: "10px", cursor: "pointer" }}
          onClick={toPrevTrack}
        />
        {isPlaying ? (
          <PlayPauseButton icon={<TiMediaPauseOutline />} playing={false} />
        ) : (
          <PlayPauseButton icon={<IoPlayOutline />} playing={true} />
        )}
        <TiMediaFastForwardOutline
          size="30px"
          style={{ margin: "10px", cursor: "pointer" }}
          onClick={toNextTrack}
        />

        <h2 className="title">{title}</h2>
        <h2 className="author">{author}</h2>
        <img className="cover" src={cover.url} alt="track cover" />
      </div>
    </div>
  );
};

export default Player;
