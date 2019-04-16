import React, { Component } from 'react';
import { turnPage } from "../actions/getProjects";
import { connect } from 'react-redux';

export class Pagination extends Component {
  turnPage(page) {
    this.props.dispatch(turnPage(page));
  }

  render() {
    return this.props.totalPage === 1 ? (
      <div className='pagination'>
          Page {this.props.page} of {this.props.totalPage}&nbsp;&nbsp;
      </div>
    ) : (
        <div className='pagination'>
            Page {this.props.page} of {this.props.totalPage}&nbsp;&nbsp;
            <span className='link' onClick={this.turnPage.bind(this, 'first')}>&#60;&#60;</span>&nbsp;
            <span className='link' onClick={this.turnPage.bind(this, 'prev')}>&#60;</span>&nbsp;
            <span className='link' onClick={this.turnPage.bind(this, 'next')}>&#62;</span>&nbsp;
            <span className='link' onClick={this.turnPage.bind(this, 'last')}>&#62;&#62;</span>
        </div>
      );
   }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Pagination);