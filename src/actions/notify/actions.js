import { getId } from '../../utils';
import { NotifyLevels } from './constants';
import { registerListeners } from './listeners';
import {
  SET_NOTIFICATIONS,
  //ADD_NOTIFICATION,
 // SET_NOTIFICATION_AS_READED,
  //REMOVE_NOTIFICATION,
//REMOVE_ALL_NOTIFICATIONS
} from './action-types.js';

export function setNotifications(notifications){
  return {
    type: SET_NOTIFICATIONS,
    messages: notifications
  };
}


export function addNotification(text, level = NotifyLevels.INFO) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const date = new Date;
    const notif = [{
        id: getId(),
        text: text,
        level: level,
        created: date.toLocaleString(),
        pending: true,
        isNew: true
      }];
    firebase.child(`myNotifications/${auth.id}`).transaction(notifications => {
      return notifications ? notifications.concat(notif) : notif;
    }, error => {
      if (error) console.log('Error add notif');
      else dispatch(registerListeners());
    });
  };
}


/*export function addNotification(text, level = NotifyLevels.INFO) {
  return { type: ADD_NOTIFICATION, notification:
    {
      id: getId(),
      text: text,
      level: level,
      created: new Date,
      pending: true,
      isNew: true
    }
  };
}*/

export function setNotificationAsReaded(index) {
   return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`myNotifications/${auth.id}`).transaction(notifications => {
      return notifications.map( (message, i) => i !== index ? message : Object.assign({}, message, message.pending ? {pending: false} : {isNew: false}));
    }, error => {
      if (error) console.log('Error');
      else dispatch(registerListeners());
    });
  };
}

/*export function setNotificationAsReaded(index) {
  return { type: SET_NOTIFICATION_AS_READED, index };
}*/

export function removeNotification(index) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`myNotifications/${auth.id}`).transaction(notifications => {
      return notifications.filter( (message, i) => i !== index );
    }, error => {
      if (error) console.log('error rm notif');
      else dispatch(registerListeners());
    });
  };
}


/*export function removeNotification(index) {
  return { type: REMOVE_NOTIFICATION, index };
}*/

export function removeAllNotifications() {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`myNotifications/${auth.id}`).set([], error => {
      if (error) console.log('error rm all notif');
      else dispatch(registerListeners());
    });
  };
}

/*export function removeAllNotifications() {
  return { type: REMOVE_ALL_NOTIFICATIONS };
}*/
