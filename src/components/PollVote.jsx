import React, { Component, PropTypes } from 'react';
import Spinner from './Spinner';

const progressContex = [
  'progress-bar-success',
  'progress-bar-info',
  'progress-bar-warning',
  'progress-bar-danger'
];

export default class PollVote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    this.props.registerListeners(this.props.params);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.unregisterListeners(this.props.params);
  }

  handleVoteClick(idPoll, idEntry) {
    this.props.voteEntry(idPoll, idEntry);
  }

  totalVotes(entries) {
    return Object.keys(entries).reduce( (total, id) => total + entries[id].votes, 0 );
  }

  createProgressBar(entry, totalVotes, index) {
    return (
      <div className="progress">
        <div className={ `progress-bar ${ progressContex[index % progressContex.length] } progress-bar-striped` } role="progressbar" style={{'width': entry.votes * 100 / (totalVotes || Infinity) + '%'}}>
          { entry.votes || 0 }
        </div>
      </div>
    );
  }

/* Enable can Vote***********************************************************************/
  hanldeSwitchCanVote(pollId, canVote){
    this.props.canVotePoll(pollId, canVote);
  }
  /**********************************************************************/

  render() {
    /* auth********************************/
    const { poll, auth } = this.props;
    const entries = poll.entries || {};
    const total = this.totalVotes(entries);
    const contents = this.state.loading ? <Spinner /> : <div>
        <div className="panel-heading">
            <h4>
              <div>
                Poll: { poll.title }
              </div>
            </h4>

            <div className="btn-group">
              <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 {poll.canVote ? 'Enabled' : 'Disabled'}<span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                <li><a href="#" onClick={() => this.hanldeSwitchCanVote(poll.id, true)}>Enable</a></li>
                <li><a href="#" onClick={() => this.hanldeSwitchCanVote(poll.id, false)}>Disable</a></li>
              </ul>
            </div>

             </div>
            <div className="panel-body">
              <h4>Entries</h4>
              <ul className="list-group">
                {
                  Object.keys(entries).map( (id, index) =>
                    <li className="list-group-item" key={index}>
                      { entries[id].title }
                      {/* cambiar '' por el span ************************************************/}
                      {
                        (poll.canVote)
                        //(!auth.id)
                          ? (poll.voters)
                            ? poll.voters.indexOf(auth.id) !== -1
                              ? ''
                              : <span onClick={ () => this.handleVoteClick(poll.id, id) } className="voteEntry action-element glyphicon glyphicon-arrow-up"/>
                            : <span onClick={ () => this.handleVoteClick(poll.id, id) } className="voteEntry action-element glyphicon glyphicon-arrow-up"/>
                          : ''
                      }
                      {/**********************************************************************/}
                      <br/>
                      { this.createProgressBar(entries[id], total, index) }
                    </li>
                  )
                }
             </ul>
        </div>
      </div>;
    return (
      <div className="panel panel-default">
        { contents }
      </div>
    );
  }
}

PollVote.propTypes = {
  poll: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  voteEntry: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  registerListeners: PropTypes.func.isRequired,
  unregisterListeners: PropTypes.func.isRequired,
  canVote: PropTypes.func
 };
