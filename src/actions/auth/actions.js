import { pushState } from 'redux-router';
import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from './action-types.js';
import { tokens } from '../../utils/tokens';

export function authenticate(user) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    dispatch(pushState(null, '/'));
    firebase.authWithCustomToken(tokens[user], (error, authData) => {
      if (error) {
        console.error('ERROR @ authWithCustomToken :', error); // eslint-disable-line no-console
      }
      else {
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: authData,
          meta: {
            timestamp: Date.now()
          }
        });
      }
    });
  };
}

function authWithToken(dispatch, firebase, token){
  firebase.authWithCustomToken(token, (error, authData) => {
      if (error) {
        console.error('ERROR @ authWithCustomToken :', error); // eslint-disable-line no-console
      }
      else {
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: authData,
          meta: {
            timestamp: Date.now()
          }
        });
      }
    });
}


export function authenticatePass(user, pass) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    dispatch(pushState(null, '/'));
    firebase.child(`users`).once('value', snap => {
      if (snap.val()){
        if (snap.val().user){
          (snap.val().user.password === pass)
            ? authWithToken(dispatch, firebase, snap.val().user.token)
            : console.log('Wrong pass');
        }
        else console.log('User doesn`t exist');
      }
        else console.log('Users doesn`t exist');
    });

  };
}


export function initAuth() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    dispatch({
      type: INIT_AUTH,
      payload: firebase.getAuth(),
      meta: {
        timestamp: Date.now()
      }
    });
  };
}

export function signOut() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.unauth();
    dispatch(pushState(null, '/'));
    dispatch({
      type: SIGN_OUT_SUCCESS
    });
  };
}


export function cancelSignIn() {
  return dispatch => {
    return dispatch(pushState(null, '/'));
  };
}


/*Sign Up & Log In *********************************************************************************/
export function signUp(user, pass){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`users`).once('value', snap => {
      (snap.val())
        ? (Object.keys(snap.val()).some(dbUser => dbUser === user))
          ? console.log('User already exists')
          : createUserAccount(dispatch, firebase, user, pass)
        : createUserAccount(dispatch, firebase, user, pass);
    });
  };
}

export function logIn(user, pass){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`users`).once('value', snap => {
      (snap.val())
        ? (snap.val()[user] && snap.val()[user].pass === pass)
          ? authenticateForm(dispatch, firebase, setToken(user))
          : console.log('User or password incorrect.')
        : console.log('User or password incorrect.');
    });
  };
}

function createUserAccount(dispatch, firebase, user, pass){
  firebase.child(`users/${user}`).set({pass}, error => {
    (error) ? console.log('Error create user')
      : authenticateForm(dispatch, firebase, setToken(user));
  });
}

export function authenticateForm(dispatch, firebase, token) {
    dispatch(pushState(null, '/'));
    firebase.authWithCustomToken(token, (error, authData) => {
      if (error) {
        console.error('ERROR @ authWithCustomToken :', error); // eslint-disable-line no-console
      }
      else {
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: authData,
          meta: {
            timestamp: Date.now()
          }
        });
      }
    });
}

function setToken(user){
  const FirebaseTokenGenerator = require("firebase-token-generator");
  const tokenGenerator = new FirebaseTokenGenerator("sRhN4rw1LfRCN8BXS5zCNpo3odJAWhTvLXXT8edk");
  const token = tokenGenerator.createToken({ uid: user, some: user, data: "here" });
  return token;
}


/*function createUserAccount(dispatch, firebase, user, pass){
  firebase.createUser({
    email: user,
    password: pass
  }, (error, userData) => {
    if (error){
      switch (error.code) {
        case "EMAIL_TAKEN":
          console.log("The new user account cannot be created because the email is already in use.");
          break;
        case "INVALID_EMAIL":
          console.log("The specified email is not a valid email.");
          break;
        default:
          console.log("Error creating user:", error);
      }
    }
    else {
      console.log("Successfully created user account with uid:", userData.uid);
    }
  });
}*/
