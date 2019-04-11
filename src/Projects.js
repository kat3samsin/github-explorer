import React, { Component } from 'react';
import { connect } from 'react-redux';

import Project from './Project';

class Projects extends Component {
  render() {
    return (
      <div>
        <h2>Projects</h2>
        {
          this.props.searchResults.map((result) => <Project key={result.id} project={result} />)
        }
      </div>
    );
   }
}

const mapStateToProps = (state) => {
  return {
      searchResults: state
  }
}

export default connect(mapStateToProps)(Projects);