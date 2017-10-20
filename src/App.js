import React, { Component } from 'react';
import './App.css';

import Editor from './Editor/Editor.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Editor />
      </div>
    );
  }
}

export default App;
