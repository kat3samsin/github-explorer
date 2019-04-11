import React, { Component } from 'react';
import { connect } from 'react-redux';

import Project from './Project';

class Projects extends Component {
  render() {
    return (
      <div>
        <h2 className='title'>Projects</h2>
        {this.props.results.isFetching ? <h3>Loading...</h3> : null}
        {this.props.results.isError ? <h3>Not found.</h3> : null}
        {Object.keys(this.props.results.data).length > 0 ? this.props.results.data.map((result) => <Project key={result.id} project={result} />) : null}
      </div>
    );
   }
}

const mapStateToProps = (state) => {
  return {
      results: state
  }
}

export default connect(mapStateToProps)(Projects);