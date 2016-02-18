import { SET_NOTIFICATIONS } from './action-types';

export function registerListeners() {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    new Promise(resolve => {
    	firebase.child(`myNotifications/${auth.id}`).on('value', snapshot => {
	    	resolve((snapshot.val()) ?Object.keys(snapshot.val()).map(key => {
	    		return {
	    			id: key,
	    			text: snapshot.val()[key].text,
				    level: snapshot.val()[key].level,
				    created: snapshot.val()[key].created,
				    pending: snapshot.val()[key].pending,
				    isNew: snapshot.val()[key].isNew
	    		};
	    	}) :[]);
	    });
    }).then(notifications => dispatch({type: SET_NOTIFICATIONS, notifications}));
  };
}

export function unregisterListeners() {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const userId = auth.id;
    const ref = firebase.child(`myPolls/${userId}`);
    ref.off();
    dispatch({
      type: SET_NOTIFICATIONS,
      notifications: []
    });
  };
}
