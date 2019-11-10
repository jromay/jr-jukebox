import './style.css';

import Fab from '@material-ui/core/Fab';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import * as _collection from 'lodash/collection';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import { getActualIndex, getActualList, getActualSong } from '../reducers';

class PlayerContainer extends Component {
  prevName() {
    const { actualIndex, playList } = this.props;
    if (playList && playList.length > 0) {
      if (actualIndex > 0) {
        return '{' + playList[actualIndex - 1].title + '}';
      } else {
        return '{' + playList[playList.length - 1].title + '}';
      }
    } else {
      return '{}';
    }
  }

  nextName() {
    const { actualIndex, playList } = this.props;
    if (playList && playList.length > 0) {
      if (actualIndex < playList.length - 1) {
        return '{' + playList[actualIndex + 1].title + '}';
      } else {
        return '{' + playList[0].title + '}';
      }
    } else {
      return '{}';
    }
  }

  playNextSong() {
    const { actualIndex, playList, nextSong } = this.props;
    if (playList) {
      //} && actualIndex < playList.length - 1) {
      nextSong();
    }
  }

  playPrevSong() {
    const { actualIndex, playList, prevSong } = this.props;
    if (playList) {
      // && actualIndex > 0) {
      prevSong();
    }
  }

  render() {
    const { actualSong } = this.props;
    return (
      <Grid>
        <Row bottom="xs">
          <Col xs={4}>
            <Row>
              <Col xs={9}></Col>
              <Col xs={3} className="right">
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => {
                    this.playPrevSong();
                  }}
                >
                  <FastRewindIcon />
                </Fab>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="jukebox-family right">
                {this.prevName()}
              </Col>
            </Row>
          </Col>
          <Col xs={4}>
            <ReactPlayer
              className="player"
              controls={true}
              url={
                `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/videos/` +
                (actualSong.year || '') +
                '/' +
                (actualSong.file || '') +
                '.mp4'
              }
              playing
              width="calc(100%-50px)"
              height="250px"
              onEnded={() => {
                this.playNextSong();
              }}
            />
          </Col>
          <Col xs={4}>
            <Row>
              <Col xs={3}>
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => {
                    this.playNextSong();
                  }}
                >
                  <FastForwardIcon />
                </Fab>
              </Col>
              <Col xs={9}></Col>
            </Row>
            <Row>
              <Col xs={12} className="jukebox-family">
                {this.nextName()}
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

PlayerContainer.propTypes = {
  playList: PropTypes.array.isRequired,
  actualSong: PropTypes.object.isRequired,
  actualIndex: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    playList: getActualList(state),
    actualSong: getActualSong(state),
    actualIndex: getActualIndex(state)
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerContainer);
