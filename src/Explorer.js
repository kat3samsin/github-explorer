import React, { Component } from 'react';
import {connect} from 'react-redux';
import { thunk_action_creator } from "./actions/getProjects";

class Explorer extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const searchKey = this.getSearch.value;
    const data = {
      searchKey
    };

    this.props.dispatch(thunk_action_creator(data.searchKey));
    this.getSearch.value = "";
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input required type="text" ref={(input => this.getSearch = input)} placeholder="Enter organization name" /><br />
          <button className='button'>Search</button>
        </form>
      </div>
    );
  }
}
export default connect()(Explorer);