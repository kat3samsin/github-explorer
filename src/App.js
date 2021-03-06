import React, { Component } from 'react';
import Explorer from './components/Explorer';
import Projects from './components/Projects'

class App extends Component {
  render() {
    return (
      <div className='App'>
          <a href='https://github.com'>
            <img src='https://image.flaticon.com/icons/svg/25/25231.svg' alt='GitHub' width='200px' height='200px'/>
          </a>
        <h1 className='title'>GitHub Repository Explorer</h1>
        <Explorer />
        <Projects />
      </div>
    );
  }
}

export default App;
