import React, { Component } from 'react';
import { turnPage } from "../actions/getProjects";
import { connect } from 'react-redux';

export class Pagination extends Component {
  handleClick(page) {
    this.props.turnPage(page);
  }

  render() {
    return this.props.totalPage === 1 ? (
      <div className='pagination'>
          Page {this.props.page} of {this.props.totalPage}
      </div>
    ) : (
        <div className='pagination'>
            Page {this.props.page} of {this.props.totalPage}&nbsp;&nbsp;
            <span id='first' className='link' onClick={this.handleClick.bind(this,'first')}>&#60;&#60;</span>&nbsp;
            <span id='prev' className='link' onClick={this.handleClick.bind(this,'prev')}>&#60;</span>&nbsp;
            <span id='next' className='link' onClick={this.handleClick.bind(this,'next')}>&#62;</span>&nbsp;
            <span id='last' className='link' onClick={this.handleClick.bind(this,'last')}>&#62;&#62;</span>
        </div>
      );
   }
}

const mapStateToProps = (state) => {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    turnPage: (page) => {
      dispatch(turnPage(page))
   }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);