import React from 'react';

type VideoId = {
  videoId: string
}
const PlayView = ( { videoId }: VideoId ) => {
  return (
    <iframe src={ `https://www.youtube.com/embed/${videoId}` } allowFullScreen></iframe>
  )
}

export default PlayView;

//onClick={() => goToVideoView(video.videoId)}