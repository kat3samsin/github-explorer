import React, { Component } from 'react';
import { turnPage } from "../actions/getProjects";
import { connect } from 'react-redux';

class Pagination extends Component {
  turnPage(page) {
    this.props.dispatch(turnPage(page));
  }

  render() {
    return this.props.results.totalPage === 1 ? (
      <div className='pagination'>
          Page {this.props.results.page} of {this.props.results.totalPage}&nbsp;&nbsp;
      </div>
    ) : (
        <div className='pagination'>
            Page {this.props.results.page} of {this.props.results.totalPage}&nbsp;&nbsp;
            <span className='link' onClick={this.turnPage.bind(this, 'first')}>&#60;&#60;</span>&nbsp;
            <span className='link' onClick={this.turnPage.bind(this, 'prev')}>&#60;</span>&nbsp;
            <span className='link' onClick={this.turnPage.bind(this, 'next')}>&#62;</span>&nbsp;
            <span className='link' onClick={this.turnPage.bind(this, 'last')}>&#62;&#62;</span>
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