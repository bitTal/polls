import React, { Component, PropTypes } from 'react';
import { tokens } from '../utils/tokens';


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  handleSignInPass(){
    const user = this.refs.user.value;
    const pass = this.refs.pass.value;
    this.props.logIn(user, pass);
  }

  handleSignIn(user) {
    this.props.authenticate(user);
  }

  handleSignUp(){
    const user = this.refs.userUp.value;
    const pass = this.refs.passUp.value;
    const rePass = this.refs.rePassUp.value;
    (pass === rePass)
      ? this.props.signUp(user, pass)
      : this.setState({error: 'Password doesn`t match.'});
  }

  render() {
    return (
      <div>
        <div style={{display: 'flex', flexFlow: 'column', alignItems: 'center'}}>
          <h1>SIGN UP</h1>
          <div className="form-group">
            <label htmlFor="userUp">User</label>
            <input type="user" className="form-control" ref="userUp" placeholder="User" />
          </div>
          <div className="form-group">
            <label htmlFor="passUp">Password</label>
            <input type="pass" className="form-control" ref="passUp" placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="rePassUp">Re-Password</label>
            <input type="pass" className="form-control" ref="rePassUp" placeholder="Password" />
          </div><br/>
          { (this.state.error !== '') ? <p className="error" style={{color: 'red'}}>{this.state.error}</p> : ''}
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <a className="btn btn-default" href="#" role="button" onClick={() => this.handleSignUp()}>Sign Up</a>
          </div>

          <div>
            <div className="form-group">
              <label htmlFor="user">User</label>
              <input type="user" className="form-control" ref="user" placeholder="User" />
            </div>
            <div className="form-group">
              <label htmlFor="pass">Password</label>
              <input type="pass" className="form-control" ref="pass" placeholder="Password" />
            </div><br/>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <a className="btn btn-default" href="#" role="button" onClick={() => this.handleSignInPass()}>Log In</a>
            </div>
          </div>
          <div className="modal-body">
            { Object.keys(tokens).map( user => <button key={ user } className="btn" type="button" onClick={ () => this.handleSignIn(user)}>{ user }</button> ) }
          </div>

        </div>
      </div>
    );
  }
}

Login.propTypes = {
  signUp: PropTypes.func,
  authenticate: PropTypes.func,
  logIn: PropTypes.func
};

