import React, { Component } from 'react';

class Project extends Component {
  render() {
    return (

      <div>
        <ul>
          <li>{this.props.project.name}</li>
        </ul>
      </div>
    );
   }
}

export default Project;