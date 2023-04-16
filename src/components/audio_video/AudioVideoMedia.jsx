import { Typography } from '@mui/material';
import React from 'react';

const AudioVideoMedia = ({ type, uri, caption }) => {
  let attachment;
  switch (type) {
    case 'audio':
      attachment = <audio controls>      <source src={uri} type="audio/mp3" />Your browser does not support the audio element.</audio>;
      break;
    case 'video':
      attachment = <video controls autoPlay><source src={uri} type="video/mp4" />Your browser does not support the video element.</video>;
      break;
    case 'image':
      attachment = <img src={uri} />
      break;
    default:
      break;
  }
  return (
    <div>
      {attachment}
      <Typography>{caption}</Typography>
    </div>
  );
}

export default AudioVideoMedia;
