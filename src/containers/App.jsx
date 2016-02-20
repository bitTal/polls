import React, { Component, PropTypes } from 'react';
import MenuContainer from './MenuContainer';
import ConfirmDialogContainer from './ConfirmDialogContainer';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';
import Login from '../components/Login';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {(this.props.auth.authenticated)
          ? <div>
              <div className="row">
                <MenuContainer />
                <div>
                  <ConfirmDialogContainer/>
                </div>
              </div>
              {children}
            </div>
          : <Login {...this.props}/>
        }
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React RouterConfirmDialog
  children: PropTypes.node,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object

};

export default connect(
  state => ({
    auth: state.auth
  }),
  authActions
  )(App);
