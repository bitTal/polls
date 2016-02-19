import { connect } from 'react-redux';
import { removeNotification, removeAllNotifications, setNotificationAsReaded, registerListeners } from '../actions/notify';

import NotificationsDetail from '../components/NotificationsDetail';

function mapStateToProps(state) {
	return {
		messages: state.messages
	};
}

function mapActionsToProps(dispatch) {
	return {
		onRemoveNotificationClick: (index) => dispatch(removeNotification(index)),
		onRemoveAllNotificationsClick: () => dispatch(removeAllNotifications()),
		onShowMessage: (index) => dispatch(setNotificationAsReaded(index)),
		registerListeners: () => dispatch(registerListeners())
	};
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(NotificationsDetail);
