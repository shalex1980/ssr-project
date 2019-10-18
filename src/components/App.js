import React from 'react';
import success from '../images/success.jpeg';
import success_2 from '../images/test/success.jpeg';
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
          <h1>Hello World </h1>
          <img src={success} alt=""/>
          <img src={success_2} alt=""/>
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