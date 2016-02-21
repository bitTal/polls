
import { connect } from 'react-redux';
import Account from '../components/Account';


function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
	mapStateToProps
)(Account);
