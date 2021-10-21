import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Tracklist = ({
  tracks,
  tracklistStatus,
  setCurrentTrack,
  trackRef,
  playing,
  playTrack,
}) => {
  return (
    <div className={`track-list ${tracklistStatus ? "shifted-tracklist" : ""}`}>
      <table className="track-table">
        {tracks.map((track) => (
          <tr key={uuidv4()}>
            <td onClick={() => playTrack(track)}>{track.title}</td>
            <td onClick={() => setCurrentTrack(track)}>{track.author}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Tracklist;
