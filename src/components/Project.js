import React, { Component } from 'react';

class Project extends Component {
  render() {
    return (
      <tr>
        <td><a href={this.props.project.html_url + '/branches/all'}>{this.props.project.name}</a></td>
        <td>{this.props.project.language}</td>
        <td>{this.props.project.stargazers_count}</td>
        <td>{this.props.project.forks}</td>
      </tr>
    );
   }
}

export default Project;