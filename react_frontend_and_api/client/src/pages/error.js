import React, { Component } from 'react';
import TopHeader from '../components/topheader';
import BottomFooter from '../components/bottomfooter';
import {Container} from 'semantic-ui-react'
class About extends Component {
  render() {
    return (
      <div>
        <TopHeader/>
          <Container>
            <img src="404.png"/>
          </Container>
        <BottomFooter/>
      </div>
    );
  }
}

export default About;