import './style.css';

import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { Row } from 'react-flexbox-grid';

import VideoListItem from './VideoListItem';

const VideoList = props => {
  let videoItems;
  switch (JSON.stringify(props.videos)) {
    case "[]":
      videoItems = <LinearProgress color="secondary" className="progress" />;
      break;
    case undefined:
      videoItems = "";
      break;
    default:
      videoItems = props.videos.map(video => {
        return (
          <VideoListItem
            onVideoSelect={props.onVideoSelect}
            key={video.id.videoId}
            video={video}
          />
        );
      });
      break;
  }
  return (
    <Row className={videoItems.length > 0 ? "videoList" : ""}>{videoItems}</Row>
  );
};

export default VideoList;
