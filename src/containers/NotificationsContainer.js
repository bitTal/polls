import { connect } from 'react-redux';
import { registerListeners, unregisterListeners } from '../actions/notify';
import Notifications from '../components/Notifications';


function mapStateToProps(state) {
  return {
    total: state.messages.length,
    pending: state.messages.filter( message => message.pending ).length
  };
}

function mapActionsToProps(dispatch) {
  return {
	registerListeners: () => dispatch(registerListeners()),
	unregisterListeners: () => dispatch(unregisterListeners())
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Notifications);
