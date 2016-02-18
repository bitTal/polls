import { SET_NOTIFICATIONS, REMOVE_NOTIFICATION, REMOVE_ALL_NOTIFICATIONS, SET_NOTIFICATION_AS_READED } from '../actions/notify';

function setNotifications(state, notifications){
  return notifications.slice();
}

function removeNotification(state, action) {
  return state.filter( (message, index) => index !== action.index );
}

function removeAllNotifications() {
  return [];
}

/*function addNotification(state, notification) {
  return [notification].concat(state);
}*/

function setAsReaded(state, index) {
  return state.map( (message, i) => i !== index ? message : Object.assign({}, message, message.pending ? {pending: false} : {isNew: false}));
}

export default function notifyReducer(state = [], action) {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return setNotifications(state, action.notifications);
    /*case ADD_NOTIFICATION:
      return addNotification(state, action.notification);*/
    case REMOVE_NOTIFICATION:
      return removeNotification(state, action);
    case REMOVE_ALL_NOTIFICATIONS:
      return removeAllNotifications();
    case SET_NOTIFICATION_AS_READED:
      return setAsReaded(state, action.index);
    default:
      return state;
  }
}
