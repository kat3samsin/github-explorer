import React, { Component } from 'react';
import Explorer from './Explorer';
import Projects from './Projects'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className='title'>GitHub Project Explorer</h1>
        <Explorer />
        <Projects />
      </div>
    );
  }
}

export default App;
