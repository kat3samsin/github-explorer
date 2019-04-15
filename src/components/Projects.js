import React, { Component } from 'react';
import { connect } from 'react-redux';

import Project from './Project';
import Pagination from './Pagination';
import Filter from './Filter';
import { sort } from "../actions/getProjects";

class Projects extends Component {
  sort(type) {
    this.props.dispatch(sort(type));
  }

  render() {
    return (
      <div>
        {this.props.results.isFetching ? <h3>Loading...</h3> : null}
        {this.props.results.isError ? <h3>Nada.</h3> : null}
        {Object.keys(this.props.results.data).length > 0 ?
          <div>
          <h2 className='title'>Projects</h2>
          <table width='100%'>
            <tbody>
                <tr>
                <td><Filter /></td>
                <td><Pagination /></td>
                </tr>
            </tbody>
          </table>
          <table width='100%'>
          <thead>
                <tr>
                  <td>Name</td>
                  <td>Language</td>
                  <td onClick={this.sort.bind(this, 'stars')}>Stars
                    {this.props.results.sort ==='stars' ? this.props.results.order === 'desc' ? '▼' : '▲' : '▲▼'}
                  </td>
                  <td onClick={this.sort.bind(this, 'forks')}>Forks
                  {this.props.results.sort ==='forks' ? this.props.results.order === 'desc' ? '▼' : '▲' : '▲▼'}
                  </td>
                </tr>
          </thead>
          <tbody>
            {this.props.results.data.map((result) => <Project key={result.id} project={result} />)}
          </tbody>
        </table>
        <Pagination />
        </div>: null}
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