import React, { Component } from 'react';
import TopHeader from '../components/topheader';
import {Container} from 'semantic-ui-react'
class About extends Component {
  render() {
    return (
      <div>
        <TopHeader/>
          <Container>
            <h1>About</h1>
            <h2>Star Prediction</h2>
            <p>The star prediction works from a multi-variable linear regression model. Due to API limits and time constraints, I was only able to train it for the top 15 most popular languages on github.</p>
            <p>Making these models was quite a difficult task considering the api limits...</p>

            <h2>Representing 31 million repositories 1000 results at a time...</h2>
            <p> Due to the 1000 api limit, I had to get a bit smarter to build a representative sample of the github community </p>
            <p> So I turned to inferential statistics and with a confidence interval of 95% and a margin of eror of 5% you could soon have a sample quite easily...or so you would think</p>

            <h2>Making sure the sample is representative</h2>
            <p> So we have the sample size of around 380+ per language, as long as we are able to accept those confidence intervals and margins of errors, but we need to make the star distribution be far for the model to accurate</p>
            <p> One great thing the github api lets us do is get the total count of results from a search query, this is HUGE. </p>

            <p> Although we can't paginate through all 6+million javascript repos, what we can do with a total count, is see how many we should be sampling with zero stars for example</p>
            <p> So we take our total count per language divide it by the sample size per language, we now have an interval by which we want to select someone. E.G. 1 in every 16th repo </p>
            <p> We now search again but we define how many stars we want, E.G. How many repos of X language have 0 stars, we now take the total count of that and divide by our interval and BOOM</p>
            <p> We can now grab a representative amount of repositories for the star distribution whilst still obeying the github api limits....Awww yeah</p>
            <center><img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/SuccessKid.jpg/256px-SuccessKid.jpg"/></center>
          </Container>
      </div>
    );
  }
}

export default About;