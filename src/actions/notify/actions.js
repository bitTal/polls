//import { getId } from '../../utils';
import { NotifyLevels } from './constants';
import { registerListeners } from './listeners';
import {
  SET_NOTIFICATIONS,
  //ADD_NOTIFICATION,
  SET_NOTIFICATION_AS_READED,
  REMOVE_NOTIFICATION,
  REMOVE_ALL_NOTIFICATIONS } from './action-types.js';

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
    firebase.child(`myNotifications/${auth.id}`).push({
      text: text,
      level: level,
      created: date.toLocaleString(),
      pending: true,
      isNew: true
    }, err => {
      if (err) console.log('Error');
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
  return { type: SET_NOTIFICATION_AS_READED, index };
}

export function removeNotification(index) {
  return { type: REMOVE_NOTIFICATION, index };
}

export function removeAllNotifications() {
  return { type: REMOVE_ALL_NOTIFICATIONS };
}
