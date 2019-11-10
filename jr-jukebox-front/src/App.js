import './App.css';
import 'typeface-roboto';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';

import { setOptions } from './actions';
import { DECADES, LANGUAGES, LETTERS, TAGS } from './constants';
import FilteredListContainer from './containers/FilteredListContainer';
import FilterListContainer from './containers/FilterListContainer';
import PersonalListsContainer from './containers/PersonalListsContainer';
import PlayerContainer from './containers/PlayerContainer';
import SavePersonalListContainer from './containers/SavePersonalListContainer';
import SelectedListContainer from './containers/SelectedListContainer';

class App extends Component {
  constructor(props) {
    super(props);
    setOptions(TAGS);
    setOptions(DECADES);
    setOptions(LETTERS);
    setOptions(LANGUAGES);
  }
  render() {
    return (
      <MuiThemeProvider>
        <Grid>
          <Row className="padding-top-40">
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
            <Col xs={4}>
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
      </MuiThemeProvider>
    );
  }
}

export default App;
