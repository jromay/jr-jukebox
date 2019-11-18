import Fab from '@material-ui/core/Fab';
import YouTubeIcon from '@material-ui/icons/YouTube';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';

import { setOptions } from '../actions';
import { DECADES, LANGUAGES, LETTERS, TAGS } from '../constants';
import FilteredListContainer from '../containers/FilteredListContainer';
import FilterListContainer from '../containers/FilterListContainer';
import PersonalListsContainer from '../containers/PersonalListsContainer';
import PlayerContainer from '../containers/PlayerContainer/';
import SavePersonalListContainer from '../containers/SavePersonalListContainer';
import SelectedListContainer from '../containers/SelectedListContainer';

class JukeBox extends Component {
  constructor(props) {
    super(props);
    setOptions(TAGS);
    setOptions(DECADES);
    setOptions(LETTERS);
    setOptions(LANGUAGES);
  }

  handleLink = () => {
    this.props.history.push("/addSongs");
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
              Buscar en Youtube
              <YouTubeIcon />
            </Fab>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <PlayerContainer />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <FilterListContainer></FilterListContainer>
            <Row>
              <Col xs={12}>
                <FilteredListContainer />
              </Col>
            </Row>
          </Col>
          <Col xs={4} className="playList">
            <Row className="background-color padding-top-15">
              <Col xs={12}>
                <SelectedListContainer />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <PersonalListsContainer />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <SavePersonalListContainer />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default JukeBox;
