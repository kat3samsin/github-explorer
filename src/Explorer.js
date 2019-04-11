import React, { Component } from 'react';
import {connect} from 'react-redux';

class Explorer extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const searchKey = this.getSearch.value;
    const data = {
      id: new Date(),
      searchKey
    };

    this.props.dispatch({
      type: 'SHOW_PROJECTS',
      data
    });

  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input required type="text" ref={(input => this.getSearch = input)} placeholder="User or Organization Name" />&nbsp;
          <button>Search</button>
        </form>
      </div>
    );
  }
}
export default connect()(Explorer);