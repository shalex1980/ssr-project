import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: this.props.initialName
    }
  }

  handleNameChange = (ev) => {
    
    this.setState({ name : ev.target.value})
  }

  render() {
    return (
      <main>
        <div className="App">
          <h1>Hello World 1!</h1>
          <div>
            <p>Enter your name:</p>
            <div><input type="text" onChange={this.handleNameChange}/></div>
          </div>
        </div>
      </main>
    )
  }
}

export default App;