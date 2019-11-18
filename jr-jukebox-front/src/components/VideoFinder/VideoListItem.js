import React from 'react';
import { Col, Row } from 'react-flexbox-grid';

const VideoListItem = ({ video, onVideoSelect }) => {
  const imageUrl = video.snippet.thumbnails.default.url;

  return (
    <Row onClick={() => onVideoSelect(video)} className="list-group-item">
      <Col xs lg={3}>
        <img alt={video.title} className="media-object" src={imageUrl} />
      </Col>
      <Col xs lg={9}>
        <div className="media-heading">{video.snippet.description}</div>
      </Col>
    </Row>
  );
};

export default VideoListItem;
