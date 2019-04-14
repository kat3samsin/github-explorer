import React, { Component } from 'react';
import { filter, clearFilter } from "../actions/getProjects";
import { connect } from 'react-redux';

class Pagination extends Component {
  applyFilters = () => {
    const filters = {
      type: 'language',
      value: this.getFilter.value.toLowerCase()
    };

    this.props.dispatch(filter(filters));
  }
  clearFilters = () => {
    this.props.dispatch(clearFilter());
    this.getFilter.value = "";
  }
  
  render() {
    return (
      <div className='filterform'>
        <input className='filter' required type="text" ref={(input => this.getFilter = input)} placeholder="Enter language" />&nbsp;
        <button className='filterbutton' onClick={this.applyFilters}>APPLY</button>&nbsp;
        <button className='filterbutton' onClick={this.clearFilters}>CLEAR</button>
      </div>
    );
   }
}

const mapStateToProps = (state) => {
  return {
      results: state
  }
}

export default connect(mapStateToProps)(Pagination);