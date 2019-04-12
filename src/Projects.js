import React, { Component } from 'react';
import { connect } from 'react-redux';

import Project from './Project';
import { sort } from "./actions/getProjects";

class Projects extends Component {
  sort(type) {
    this.props.dispatch(sort(type));
  } 
  render() {
    return (
      <div>
        {this.props.results.isFetching ? <h3>Loading...</h3> : null}
        {this.props.results.isError ? <h3>Not found.</h3> : null}
        {Object.keys(this.props.results.data).length > 0 ?
          <div>
          <h2 className='title'>Projects</h2>
          <table width='100%'>
          <thead>
                <tr>
                  <td onClick={this.sort.bind(this, 'name')}>Name</td>
                  <td onClick={this.sort.bind(this, 'language')}>Language</td>
                  <td onClick={this.sort.bind(this, 'stargazers_count')}>Stars</td>
                  <td onClick={this.sort.bind(this, 'forks')}>Forks</td>
                </tr>
          </thead>
          <tbody>
            {this.props.results.data.map((result) => <Project project={result} />)}
          </tbody>
        </table></div>: null}
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