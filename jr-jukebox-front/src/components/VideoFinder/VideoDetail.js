import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import ReactPlayer from 'react-player';

import FormYoutubeContainer from '../../containers/PlayerContainer/FormYoutubeContainer';

const VideoDetail = ({ video, form }) => {
  if (!video || !video.id) {
    video = {
      id: {},
      snippet: {}
    };
  }

  const videoId = form.youtubeid;

  const url = `https://www.youtube.com/embed/${videoId}`;
  return (
    <Row>
      <Col xs={12}>
        <Row>
          <ReactPlayer
            className="player"
            controls={true}
            url={url}
            playing
            width="calc(100%-50px)"
            height="250px"
          />
        </Row>
        <Row>
          <FormYoutubeContainer />
        </Row>
      </Col>
    </Row>
  );
};

export default VideoDetail;
