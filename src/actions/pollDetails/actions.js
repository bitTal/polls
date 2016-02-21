import Firebase from 'firebase';
import {
  UPDATE_POLL_ERROR
} from './action-types';

export function editPollTitle(idPoll, title) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`polls/${idPoll}`)
      .update({title}, error => {
        if (error) {
          console.error('ERROR @ updatePoll :', error); // eslint-disable-line no-console
          dispatch({
            type: UPDATE_POLL_ERROR,
            payload: error,
          });
        }
        else {
          /************************************************************************/
          dispatch({type: "SET_METADATA", metadata: {text: 'Poll ' + title + ' changed title', type: 'alert alert-info'}});
          /************************************************************************/
        }
    });
  };
}

export function addEntry(idPoll, title) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`polls/${idPoll}/entries`)
      .push({ title, votes: 0, createdAt: Firebase.ServerValue.TIMESTAMP }, error => {
        if (error) {
          console.error('ERROR @ updatePoll :', error); // eslint-disable-line no-console
          dispatch({
            type: UPDATE_POLL_ERROR,
            payload: error,
          });
        }
        else {
          /************************************************************************/
          dispatch({type: "SET_METADATA", metadata: {text: ' Entry ' + title + ' added', type: 'alert alert-success'}});
          /************************************************************************/
        }
    });
  };
}

export function removeEntry(idPoll, idEntry) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`polls/${idPoll}/entries/${idEntry}`)
      .remove(error => {
        if (error) {
          console.error('ERROR @ updatePoll :', error); // eslint-disable-line no-console
          dispatch({
            type: UPDATE_POLL_ERROR,
            payload: error,
          });
        }
        else {
          /************************************************************************/
          dispatch({type: "SET_METADATA", metadata: {text: ' Entry ' + idEntry + ' removed', type: 'alert alert-danger'}});
          /************************************************************************/
        }
    });
  };
}

export function voteEntry(idPoll, idEntry) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`polls/${idPoll}/entries/${idEntry}/votes`)
      .transaction(votes => votes + 1, error => {
        if (error) {
          console.error('ERROR @ updatePoll :', error); // eslint-disable-line no-console
          dispatch({
            type: UPDATE_POLL_ERROR,
            payload: error,
          });
        }
        /*else add user to voters***************************************************************************/
        else {
          firebase.child(`polls/${idPoll}/voters`).transaction(voters => {
            return (voters) ? voters.concat([auth.id]) : [auth.id];
          });
          /************************************************************************/
          dispatch({type: "SET_METADATA", metadata: {text: ' Entry ' + idEntry + ' voted', type: 'alert alert-info'}});
          /************************************************************************/
        }
    });
  };
}

/* Edit poll vote **************************************************************************/
export function canVotePoll(pollId, canVote){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`polls/${pollId}/canVote`).set(canVote, error => {
      if (error) console.log('Error, vote option not changed.');
    });
  };
}
