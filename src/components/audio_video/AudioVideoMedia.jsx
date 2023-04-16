import React from 'react';

const AudioVideoMedia = ({ type, uri }) => {
  let attachment;
  switch (type) {
    case 'mp3':
      attachment = <audio controls>      <source src={uri} type="audio/mp3" />Your browser does not support the audio element.</audio>;
      break;
    case 'mp4':
      attachment = <video controls><source src={uri} type="video/mp4" />Your browser does not support the video element.</video>;
      break;

    default:
      attachment = <img src={uri} />
      break;
  }
  return (
    <div>
      {attachment}
    </div>
  );
}

export default AudioVideoMedia;
