import React, { Component, PropTypes } from 'react';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { tokens } from '../utils/tokens';

export default class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: true };
  }

  handleCancelClick() {
    this.setState({ isOpen: false });
    this.props.cancelSignIn();
  }

  handleSignIn(user) {
    this.props.authenticate(user);
  }


  render() {
    const { isOpen } = this.state;
    return (
      <Modal isOpen={isOpen} onRequestHide={() => this.handleCancelClick()} backdrop keyboard>
        <div className="modal-header">
          <ModalClose onClick={() => this.handleCancelClick()}/>
          <h4 className="modal-title">Sign in Dialog</h4>
        </div>
        <div>
          <div className="form-group" style={{paddingLeft: '20px'}}>
            <label htmlFor="user">User</label>
            <input type="user" className="form-control" ref="user" placeholder="User" style={{width: '40% !important'}} />
          </div>
          <div className="form-group" style={{paddingLeft: '20px'}}>
            <label htmlFor="pass">Password</label>
            <input type="pass" className="form-control" ref="pass" placeholder="Password" style={{width: '40% !important'}} />
          </div><br/>
          <div style={{display: 'flex', justifyContent: 'flex-end', width: '40%'}}>
            <a className="btn btn-default" href="#" role="button" onClick={() => this.handleSignInPass()}>Log In</a>
          </div>
        </div>
        <div className="modal-body">
          { Object.keys(tokens).map( user => <button key={ user } className="btn" type="button" onClick={ () => this.handleSignIn(user)}>{ user }</button> ) }
        </div>
      </Modal>
    );
  }

}

SignIn.propTypes = {
  cancelSignIn: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired,
  authenticatePass: PropTypes.func.isRequired

};
