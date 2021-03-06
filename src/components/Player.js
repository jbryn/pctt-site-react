import { useEffect, useRef, useState } from "react";
import PlayerControls from "./PlayerControls";
import { IoVolumeHighSharp } from "react-icons/io5";

const Player = ({ tracks }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const { title, cover, author, audio } = tracks[trackIndex];
  const audioRef = useRef(new Audio(audio.url));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;

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

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audio.url);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
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

  useEffect(() => {
    console.log(duration);
  }, [volume]);

  return (
    <div className="player">
      <div className="track-info">
        <div className="controls">
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPauseClick={setIsPlaying}
            onPrevClick={toPrevTrack}
            onNextClick={toNextTrack}
          />
        </div>
        <div className="progress-container">
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            className="progress center"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
          />
        </div>
        <div className="info">
          <img className="cover" src={cover.url} alt="track cover" />
          <div className="labels">
            <h2 className="title">{title}</h2>
            <h2 className="author">{author}</h2>
          </div>
        </div>
        <div className="volume-icon-container">
          <IoVolumeHighSharp className="center" size="30px" />
        </div>
        <div className="volume-container">
          <input
            type="range"
            value={volume}
            step="0.01"
            min="0"
            max="1"
            className="volume center"
            onChange={(e) => {
              setVolume(e.target.value);
              audioRef.current.volume = e.target.value;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
