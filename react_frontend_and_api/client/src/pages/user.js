import React, { Component } from 'react';
import TopHeader from '../components/topheader';
import BottomFooter from '../components/bottomfooter';
import {Bar} from 'react-chartjs-2';
import { 
  Link
} from 'react-router-dom'
import {
  Container,
  Card,
  Image,
  Header,
  Statistic,
  Table,
  Rating
} from 'semantic-ui-react'
import Chart from '../components/chart'
import {
  Grid,
  Row,
  Col,
  Glyphicon
} from 'react-bootstrap';

const divStyle = {
  display: 'table',
  margin: 'auto',
};

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfos: [],
      repos: [],
      color:"green",
    };
  }

  componentDidMount(){
      fetch('/api/'+String(this.props.match.params.user))
      .then(res => res.json())
      .then(userInfo => this.setState({ userInfos: userInfo}))
      .then(userInfo => {this.setState({ userInfos: userInfo,repos:userInfo[0].repos})})
      .then("userstate"+console.log(this.state)); 
  }
  componentWillReceiveProps(newProps){
      fetch('/api/'+String(newProps.match.params.user))
      .then(res => res.json())
      .then(userInfo => {this.setState({ 
                    userInfos: userInfo,
                    repos: userInfo[0].repos
                  })});
      console.log(this.state);
  }

  render() {
    const { userInfos } = this.state;
    const { repos } = this.state;
    const { chartData } = this.state;
    return (
      <div>
        <TopHeader/>
          <Container>
            <Grid>
              <Row>
              <Col xs={12} md={8}>
               {userInfos.map(userInfo =>
                <h1 href={userInfo.id}>{userInfo.bio.login}</h1>)}
              </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={12} md={8}>
               {userInfos.map(userInfo =>
                <Bar
                 data={{
                    labels: ["Actual Stars", "Expected Stars"],
                    datasets:[
                    {
                      label:'Stars',
                      data:[ userInfo.statistics.received_stars,userInfo.statistics.expected_stars],
                      backgroundColor:[
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                      ]
                    }
                ]
                }}
                var options = {{
                  scales: {
                    yAxes: [{
                      ticks: {
                      beginAtZero: true,
                      min: 0
                    }    
                  }]
                  },
                title:{
                      display:true,
                      text:'Actual Stars Vs Linear Regression Predicted Stars',
                  fontSize:25
                },
                legend:{
                  display:false,
                  position:'right'
                  }
                }}
                />)}
                </Col>
                <Col xs={12} md={4}>
                 {userInfos.map(userInfo =>
                  <Card color={userInfo.bio.color}>
                    <Image src={userInfo.bio.avatar_url} />
                  <Card.Content>
                    <Card.Header>{userInfo.bio.name}</Card.Header>
                    <Card.Meta>{userInfo.bio.login}</Card.Meta>
                    <Card.Description>{userInfo.bio.location}</Card.Description>
                  </Card.Content>
                  </Card>)}
                </Col>
              </Row>
            <br/><br/><br/>
            <div style={divStyle}>
            <Row>
            <Col xs={12} md={12}>
              <h2>User Breakdown and Star Analysis</h2>
            </Col>
            </Row>
            </div>
            <br/>
            <div style={divStyle}>
            <Row>
            <Col xs={12} md={12}>
            {userInfos.map(userInfo =>
            <Statistic.Group color={userInfo.bio.color}>
              <Statistic>
                <Statistic.Value>{userInfo.statistics.received_stars}<Glyphicon glyph='star'/></Statistic.Value>
                <Statistic.Label>Recieved Stars</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{Math.round(userInfo.statistics.expected_stars * 100) / 100}<Glyphicon glyph='star'/></Statistic.Value>
                <Statistic.Label>Predicted Stars*</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{userInfo.statistics.predicted_percentage_star_difference}%<Glyphicon glyph='star'/></Statistic.Value>
                <Statistic.Label>Predicted Stars Difference</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{userInfo.bio.followers}<Glyphicon glyph='user'/></Statistic.Value>
                <Statistic.Label>Followers</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{userInfo.bio.following}<Glyphicon glyph='user'/></Statistic.Value>
                <Statistic.Label>Following</Statistic.Label>
              </Statistic>
            </Statistic.Group>
              )}
            </Col>
            </Row>
            </div>
            <br/><br/>
            <p>* Based on a Linear Regression Machine Learning Model, trained on a sample size of representative repos.</p>
            <p> The sample was completed via finding a representative sample size with a 95% confidence interval with a 5% margin of error.</p>
            <p> This was done by finding the total number of repos for a given language and then calculating the sample size.</p>
            <p> As github limits search results to 1000, I had to do some tricks to get this sample, please see the video for how this remains representative.</p>
            
            <br/>
            <div style={divStyle}>
            <Row>
            <Col xs={12} md={12}>
              <h2>Predicted Stars Repository Analysis</h2>
            </Col>
            </Row>
            </div>
            <br/>
            <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine>Repository Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Primary Language</Table.HeaderCell>
                <Table.HeaderCell>Predicted Stars</Table.HeaderCell>
                <Table.HeaderCell>Actual Stars</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
             {userInfos.map(userInfo=>
              {return userInfo.repos.map(repoInfo=>
              <Table.Row>
                <Table.Cell>
                  <Header as='h2' textAlign='center'>
                  {repoInfo.name}
                  </Header>
                </Table.Cell>
                <Table.Cell>{repoInfo.description}</Table.Cell>
                <Table.Cell>
                {repoInfo.main_language}
                </Table.Cell>
                <Table.Cell>
                    {repoInfo.expected_stars}
                </Table.Cell>
                <Table.Cell>
                {repoInfo.stars}
                </Table.Cell>
              </Table.Row>)})}
            </Table.Body>
            </Table>
            <br/>

            <div style={divStyle}>
            <Row>
            <Col xs={12} md={12}>
              <h2>Followers</h2>
            </Col>
            </Row>
            </div>


            <br/>
            <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine>Followers</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {userInfos.map(userInfo=>
              {return userInfo.follower.map(followerInfo=>
              <Table.Row>
                <Table.Cell>
                  <Link to={"/"+followerInfo.login}>
                    <Header as='h2' textAlign='center'>
                    {followerInfo.login}
                  </Header>
                  </Link>
                </Table.Cell>
              </Table.Row>)})}
            </Table.Body>
            </Table>
            <br/><br/>


                        <div style={divStyle}>
            <Row>
            <Col xs={12} md={12}>
              <h2>Following</h2>
            </Col>
            </Row>
            </div>


            <br/>
            <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine>Following</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {userInfos.map(userInfo=>
              {return userInfo.following.map(followingInfo=>
              <Table.Row>
                <Table.Cell>
                    <Link to={"/"+followingInfo.login}>
                    <Header as='h2' textAlign='center'>
                    {followingInfo.login}
                  </Header>
                  </Link>
                </Table.Cell>
              </Table.Row>)})}
            </Table.Body>
            </Table>
            <br/><br/>


            </Grid>
          </Container>
      </div>
    );
  }
}

export default User;