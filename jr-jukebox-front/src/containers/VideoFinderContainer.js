import * as _ from 'lodash/function';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import SearchBar from '../components/VideoFinder/SearchBar';
import VideoDetail from '../components/VideoFinder/VideoDetail';
import VideoList from '../components/VideoFinder/VideoList';
import { getFormValue, getSelectedVideo, getVideoList } from '../reducers';
import { URL_API } from './../constants';

var ROOT_URL = `${URL_API}search/?query=`;

class VideoFinderContainer extends Component {
  videoSearch = term => {
    const { setVideoList } = this.props;
    setVideoList([]);
    fetch(ROOT_URL + term)
      .then(response => response.json())
      .then(response2 => {
        setVideoList(response2.data);
      });
  };

  onSelectedVideo = video => {
    const { setSelectedVideo } = this.props;
    setSelectedVideo(video);
  };

  render() {
    const videoSearchDelay = _.debounce(term => {
      this.videoSearch(term);
    }, 500);

    return (
      <Grid>
        <Row>
          <Col xs={5}>
            <h5>Buscar en youtube:</h5>
            <SearchBar onSearchTermChange={videoSearchDelay} />
            <VideoList
              onVideoSelect={selectedVideo =>
                this.onSelectedVideo(selectedVideo)
              }
              videos={this.props.videos}
            />
          </Col>
          <Col xs={7}>
            <VideoDetail
              video={this.props.selectedVideo}
              form={this.props.formValue}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

VideoFinderContainer.propTypes = {
  selectedVideo: PropTypes.object.isRequired,
  videos: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    selectedVideo: getSelectedVideo(state),
    videos: getVideoList(state),
    formValue: getFormValue(state)
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoFinderContainer);
