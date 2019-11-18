import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';

// Create the HTML to return for the input
class SearchBar extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { term: "" };
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <input
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}
            style={{ width: "75%" }}
          />
        </Col>
      </Row>
    );
  }
}

//We need to export to index.js to display
export default SearchBar;
//means any file that imports searchBar
//will only get the searchBar component
