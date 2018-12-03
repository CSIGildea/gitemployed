import React, { Component } from 'react';
import './App.css';
import Customers from './components/customers';
import TopHeader from './components/topheader';
import BottomFooter from './components/bottomfooter';
import {Container} from 'semantic-ui-react'
class App extends Component {
  render() {
    return (
      <div className="App">
        <TopHeader/>
          <Container>
            <Customers/>
          </Container>
        <BottomFooter/>
      </div>
    );
  }
}

export default App;
