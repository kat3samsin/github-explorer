import React, { Component } from 'react';

class Project extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.project.name}</td>
        <td>{this.props.project.language}</td>
        <td>{this.props.project.stargazers_count}</td>
        <td>{this.props.project.forks}</td>
        <td><a href={this.props.project.branches_url}>{this.props.project.branches_url}</a></td>
      </tr>
    );
   }
}

export default Project;