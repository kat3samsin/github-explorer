import React, { Component } from 'react';
import { connect } from 'react-redux';

import Project from './Project';
import Pagination from './Pagination';
import Filter from './Filter';
import { sort } from "../actions/getProjects";

export class Projects extends Component {
  sort(type) {
    this.props.dispatch(sort(type));
  }

  render() {
    return (
      <div>
        {this.props.isFetching ? <h3>Loading...</h3> : null}
        {this.props.isError ? <h3>Nada.</h3> : null}
        {this.props.data && this.props.data.length > 0 ?
          <div>
          <h2 className='title'>Repositories</h2>
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
                    {this.props.sort ==='stars' ? this.props.order === 'desc' ? '▼' : '▲' : '▲▼'}
                  </td>
                  <td onClick={this.sort.bind(this, 'forks')}>Forks
                  {this.props.sort ==='forks' ? this.props.order === 'desc' ? '▼' : '▲' : '▲▼'}
                  </td>
                </tr>
          </thead>
          <tbody>
            {this.props.data.map((d) => <Project key={d.id} project={d} />)}
          </tbody>
        </table>
        <Pagination />
        </div>: null}
      </div>
    );
   }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Projects);
