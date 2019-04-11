import React, { Component } from 'react';

class Project extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.project.name}</td>
        <td>{this.props.project.language}</td>
        <td>{this.props.project.stargazers_count}</td>
        <td>{this.props.project.forks}</td>
        <td>
          <a href={this.props.project.branches_url}>
            <img src='https://image.flaticon.com/icons/svg/25/25284.svg' alt='Go to GitHub project page' width='15px' height='15px'/>
            </a>
          </td>
      </tr>
    );
   }
}

export default Project;