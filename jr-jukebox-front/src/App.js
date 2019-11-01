import './App.css';
import 'typeface-roboto';

import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import ReactPlayer from 'react-player';

import { setOptions } from './actions';
import { DECADES, LETTERS, TAGS } from './constants';
import FilterListContainer from './containers/FilterListContainer';
import { getOptions } from './reducers';

class App extends Component {
  constructor(props) {
    super(props);
    setOptions(TAGS);
    setOptions(DECADES);
    setOptions(LETTERS);
  }
  render() {
    return (
      <MuiThemeProvider>
        <Grid>
          <Row>
            <Col xs={4}></Col>
            <Col xs={4}>
              <ReactPlayer controls={true} url="https://www.youtube.com/watch?v=oZ5tUAikti" playing width="100%" height="250px" />
            </Col>
            <Col xs={4}></Col>
          </Row>
          <Row>
            <Col xs={8}>
              <FilterListContainer></FilterListContainer>
              <Row>
                <Col xs={12}>FilteredList</Col>
              </Row>
              <Row>
                <Col xs={12}>Acciones</Col>
              </Row>
            </Col>
            <Col xs={4}>
              <Row>
                <Paper zDepth={4}>Lista</Paper>
              </Row>
              <Row>
                <Paper zDepth={4}>Combo listas</Paper>
              </Row>
              <Row>
                <Paper zDepth={4}>Formulario grabar lista</Paper>
              </Row>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
