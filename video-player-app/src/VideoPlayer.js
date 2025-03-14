import { useState, useEffect } from "react";

const VideoPlayer = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await fetch(`http://localhost:3000/stream/${videoId}`);
        const data = await response.json();
        setVideoUrl(data.signedUrl);
      } catch (error) {
        console.error("Error fetching video URL:", error);
      }
    };

    fetchVideoUrl();
  }, [videoId]);

  return (
    <div>
      {videoUrl ? (
        <video controls width="640">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoPlayer;
