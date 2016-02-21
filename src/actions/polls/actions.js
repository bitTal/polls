import {
  SET_POLLS,
  ADD_POLL_ERROR,
  REMOVE_POLL_ERROR
} from './action-types';

import { createActionConfirmation } from '../confirm';
import Firebase from 'firebase';

export function setPolls(polls) {
  return { type: SET_POLLS, polls };
}

export function addPoll(title) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const newPollRef = firebase.child('polls')
      .push({ title, createdAt: Firebase.ServerValue.TIMESTAMP, canVote: true }, error => {
        if (error) {
          console.error('ERROR @ addPoll :', error); // eslint-disable-line no-console
          dispatch({
            type: ADD_POLL_ERROR,
            payload: error,
        });
      } else {
        const pollId = newPollRef.key();
        const userId = auth.id;
        /************************************************************************/
        dispatch({type: "SET_METADATA", metadata: {text:'Poll ' + title + ' added', type: 'alert alert-success'}});
        /************************************************************************/
        firebase.child(`myPolls/${userId}/${pollId}`).set({ createdAt: Firebase.ServerValue.TIMESTAMP });
      }
    });
  };
}

export function removePoll(pollId, pollTitle) {
  return (dispatch, getState) => {
    dispatch(createActionConfirmation(`Are you sure you want to delete de poll with title "${pollTitle}"?`, () => {
      const { firebase, auth } = getState();
      firebase.child(`polls/${pollId}`)
        .remove(error => {
          if (error) {
            console.error('ERROR @ removePoll :', error); // eslint-disable-line no-console
            dispatch({
              type: REMOVE_POLL_ERROR,
              payload: error,
            });
          } else {
            const userId = auth.id;
            firebase.child(`myPolls/${userId}/${pollId}`).remove();
            /************************************************************************/
            dispatch({type: "SET_METADATA", metadata: {text: ' Poll ' + pollTitle + ' removed', type: 'alert alert-danger'}});
            /************************************************************************/
          }
        });
    }));
  };
}

/*export function canVotePoll(pollId, canVote){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`polls/${pollId}/canVote`).set(canVote, error => {
      if (error) console.log('Error, vote option not changed.');
    });
  };
}*/

