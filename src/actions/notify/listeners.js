import { SET_NOTIFICATIONS } from './action-types';

export function registerListeners() {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    new Promise(resolve => {
		firebase.child(`myNotifications/${auth.id}`).on('value', snapshot => {
			resolve(snapshot.val() ? snapshot.val().reverse() : []);
		});
    }).then(notifications => dispatch({type: SET_NOTIFICATIONS, notifications}));
  };
}

export function unregisterListeners() {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const userId = auth.id;
    const ref = firebase.child(`myNotifications/${userId}`);
    ref.off();
    dispatch({
      type: SET_NOTIFICATIONS,
      notifications: []
    });
  };
}
