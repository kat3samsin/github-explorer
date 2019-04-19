import React, { Component } from 'react';
import { filter, getProjects } from "../actions/getProjects";
import { connect } from 'react-redux';

export class Filter extends Component {
  applyFilters = () => {
    const filters = {
      type: 'language',
      value: this.getFilter ? encodeURIComponent(this.getFilter.value.toLowerCase()) : ''
    };

    this.props.applyFilters(filters);
  }
  clearFilters = () => {
    this.props.clearFilters();
    this.getFilter.value = "";
  }

  handleOnClick = (e) => {
    if (e.keyCode === 13) {
        this.applyFilters();
    }
  }

  render() {
    return (
      <div className='filterform'>
        <input className='filter' onKeyUp={this.handleOnClick} required type="text" ref={(input => this.getFilter = input)} placeholder="Enter language" />&nbsp;
        <button id='applyFilters' className='filterbutton' onClick={this.applyFilters}>APPLY</button>&nbsp;
        <button id='clearFilters' className='filterbutton' onClick={this.clearFilters}>CLEAR</button>
      </div>
    );
   }
}
function mapDispatchToProps(dispatch) {
  return {
    applyFilters: (filters) => {
      dispatch(filter(filters))
   }, clearFilters: () => {
      dispatch(getProjects())
    }
  }
}
export default connect(null, mapDispatchToProps)(Filter);