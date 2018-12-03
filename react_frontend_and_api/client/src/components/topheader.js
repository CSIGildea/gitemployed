import React, { Component } from 'react';
import './customers.css';
import {
  Search,
} from 'semantic-ui-react'
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap'
import { 
  Link,
  Redirect
} from 'react-router-dom'

const pStyle = {
  color:'white',
};

class TopHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {value: '',searchUser:false,userlink:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  componentWillReceiveProps(newProps){
    this.setState({value: ""});
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }


  handleSubmit(event) {
    this.setState({searchUser:true, userlink: '/'+String(this.state.value)})
    event.preventDefault();
  }
  render() {
    if(this.state.searchUser){
      this.setState({searchUser:false});
      return <Redirect push to={'/'+this.state.value}/>;
    }
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
             <Link to="/">
              <img src="gitemployed.png" alt="github logo"/>
             </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Form pullLeft>
          <form onSubmit={this.handleSubmit}>
          <Search size='tiny' value={this.state.value} text="" showNoResults={false} placeholder={"Enter a github username"} onSearchChange ={this.handleChange} />
          </form>
        </Navbar.Form>
          <Nav pullRight>
            <NavItem componentClass={Link} href="/about" to="/about">
              <h4 style={pStyle}>About</h4>
            </NavItem>
            <NavItem componentClass={Link} href="/contact" to="/contact">
              <h4 style={pStyle}>Contact</h4>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default TopHeader;
