import React, { Component } from 'react';
import './customers.css';
import Chart from './chart.js';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    fetch('/api/customers')
      .then(res => res.json())
      .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }

  render() {
    return (
      <div>
        <Chart/>
      </div>
    );
  }
}

export default Customers;
