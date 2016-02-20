import React, { Component, PropTypes } from 'react';
import MenuContainer from './MenuContainer';
import ConfirmDialogContainer from './ConfirmDialogContainer';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';
import Login from '../components/Login';
import { removeMetadata } from '../actions/metadata';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      text: ''
    };
  }

  handleHideAlert(){
    if (this.props.metadata.text){
      setTimeout(() => {
          //document.getElementById('alert').setAttribute('class', 'animated bounceInRight');
          document.getElementById('alert').style.display = 'inherit';
      }, 0);
      setTimeout(() => {
          //document.getElementById('alert').setAttribute('class', 'animated bounceInLeft');
          document.getElementById('alert').style.display = 'none';
          this.props.removeMetadata();
      }, 2500);
    }
  }

  /*handleAlert(){
    const text = this.props.metadata.text;
    if (text){
      JSON.stringify(text) === JSON.stringify(this.state.text)
        ? this.setState({alert: false})
        : this.setState({alert: true});
      this.setState({text: JSON.stringify(this.props.metadata.text)});
    }
    else this.setState({alert: false});
  }*/

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
              {(this.props.metadata.text)
                ? <div id="alert" style={{width: '160px !important', position: 'absolute', right: '1px', top: '55px'}}>
                    <div className={this.props.metadata.type + ' alert-dismissible animated bounceInRight'}
                          role="alert">
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <p>{this.props.metadata.text}</p>
                    </div>
                  </div>
                : ''}
                {this.handleHideAlert()}
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
  auth: PropTypes.object,
  metadata: PropTypes.object,
  removeMetadata: PropTypes.func
};

export default connect(
  state => ({
    auth: state.auth,
    metadata: state.metadata
  }),
  Object.assign( {}, authActions, { removeMetadata } )
  )(App);
