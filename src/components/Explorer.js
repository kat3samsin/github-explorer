import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getProjects } from "../actions/getProjects";

export class Explorer extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const searchKey = this.getSearch ? this.getSearch.value : '';
    const data = {
      id: new Date(),
      searchKey
    };

    this.props.search(data.searchKey);
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
function mapDispatchToProps(dispatch) {
  return {
    search: (searchKey) => {
      dispatch(getProjects(searchKey))
   }
  }
 }
export default connect(null, mapDispatchToProps)(Explorer);