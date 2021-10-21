import { useEffect, useState } from "react";
import { request } from "graphql-request";

const Player = ({}) => {
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      const { tracks } = await request(
        "https://api-eu-central-1.graphcms.com/v2/ckto93z5j0yi101yz5wksgk09/master",
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

  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return <div></div>;
};

export default Player;
