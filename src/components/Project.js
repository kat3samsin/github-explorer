import React, { Component } from 'react';

class Project extends Component {
  render() {
    return this.props && this.props.project ? (
      <tr>
        <td><a href={this.props.project.html_url + '/branches/all'}>{this.props.project.name}</a></td>
        <td>{this.props.project.language}</td>
        <td>{this.props.project.stargazers_count.toLocaleString()}</td>
        <td>{this.props.project.forks.toLocaleString()}</td>
      </tr>
    ) : null;
   }
}

export default Project;