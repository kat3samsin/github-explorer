import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getProjects } from "../actions/getProjects";

class Explorer extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const searchKey = this.getSearch.value;
    const data = {
      id: new Date(),
      searchKey
    };

    this.props.dispatch(getProjects(data.searchKey));
    this.getSearch.value = "";
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input className='org' required type="text" ref={(input => this.getSearch = input)} placeholder="Enter organization name" /><br />
          <button className='button'>Search</button>
        </form>
      </div>
    );
  }
}
export default connect()(Explorer);