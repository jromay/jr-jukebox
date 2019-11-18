import './App.css';
import 'typeface-roboto';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import JukeBox from './components/JukeBox';
import VideoFinder from './components/VideoFinder';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <Route exact path="/" component={JukeBox} />
          <Route path="/addSongs" component={VideoFinder} />
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
