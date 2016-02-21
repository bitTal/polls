import React, { Component, PropTypes } from 'react';

export default class Account extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <p>{this.props.auth.id}</p>
    );
  }
}


Account.propTypes = {
  auth: PropTypes.object
};
