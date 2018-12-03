import React, { Component } from 'react';
import TopHeader from '../components/topheader';
import {Container} from 'semantic-ui-react'
class MainPage extends Component {
  render() {
    return (
      <div>
        <TopHeader/>
          <Container>
            <h1>GitEmployed</h1>
            <img src="gitemployedblack.png"/>
            <h3>Star Prediction</h3>
            <h4> I made this as I thought it was an interesting thing to predict, it could be used in recruitment to see does someone produce more popular (arguable better) code than an average github member</h4>
            <p> By far the biggest feature of this site is the multi-variable linear regression model trained for the top 15 programming languages on github.</p>
            <p> It takes factors such as the amount of followers, the amount of following, the size of the repo, the main language used and the time since the repo was created </p>

            <p> The site can then predict how many stars you should have based on these factors</p>

            <h3>Cool Tech</h3>
            <h4> Single Page Application (NO load times, YAY)</h4>
            <h4> React used for the frontend</h4>
            <h4> NodeJS API serves the SPA React frontend</h4>
            <h4> Web scraper built on python, which scrapes so much my IP got temporarily banned from github</h4>
            <h4> Tensorflow Multiple variable machine learning model trained and outputted via a json to be used in the NodeJS API </h4>
          </Container>
      </div>
    );
  }
}

export default MainPage;