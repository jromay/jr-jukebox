import Fab from '@material-ui/core/Fab';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';

import VideoFinderContainer from '../../containers/VideoFinderContainer';

class VideoFinder extends Component {
  handleLink = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} className="right min-height-40">
            <Fab
              color="secondary"
              aria-label="add"
              variant="extended"
              size="medium"
              onClick={() => {
                this.handleLink();
              }}
            >
              Volver A JukeBox
              <MusicVideoIcon />
            </Fab>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="padding-top-40">
            <VideoFinderContainer />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default VideoFinder;
