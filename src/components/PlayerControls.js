import {
  TiMediaPlayOutline,
  TiMediaPauseOutline,
  TiMediaFastForwardOutline,
  TiMediaRewindOutline,
} from "react-icons/ti";
import { IconContext } from "react-icons";

const PlayPauseButton = ({ icon }) => {
  return (
    <IconContext.Provider
      value={{
        color: "white",
        size: "30px",
        style: { margin: "10px", cursor: "pointer" },
      }}
    >
      <div>{icon}</div>
    </IconContext.Provider>
  );
};

const PlayerControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <>
      <TiMediaRewindOutline
        size="30px"
        style={{ margin: "10px", cursor: "pointer" }}
        onClick={onPrevClick}
      />
      {isPlaying ? (
        <div onClick={() => onPlayPauseClick(false)}>
          <PlayPauseButton icon={<TiMediaPauseOutline />} />
        </div>
      ) : (
        <div onClick={() => onPlayPauseClick(true)}>
          <PlayPauseButton icon={<TiMediaPlayOutline />} />
        </div>
      )}
      <TiMediaFastForwardOutline
        size="30px"
        style={{ margin: "10px", cursor: "pointer" }}
        onClick={onNextClick}
      />
    </>
  );
};

export default PlayerControls;
