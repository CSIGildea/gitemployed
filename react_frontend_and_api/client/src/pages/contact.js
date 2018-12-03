import React, { Component } from 'react';
import TopHeader from '../components/topheader';
import {Container} from 'semantic-ui-react'
class Contact extends Component {
  render() {
    return (
      <div>
        <TopHeader/>
          <Container>
            <h1>Contact</h1>
            <br/>
            <a href="https://ie.linkedin.com/in/csigildea"><h2>LinkedIn</h2></a>
            </Container>
      </div>
    );
  }
}

export default Contact;