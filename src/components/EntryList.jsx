import React, { Component, PropTypes } from 'react';

export default class EntryList extends Component {

  constructor(props) {
    super(props);
    /**********************************************************/
    this.state = {
      editing: false,
      idEntry: '',
      addDisabled: true,
    };
  }

  handleRemoveButtonClick(idPoll, idEntry) {
    this.props.removeEntry(idPoll, idEntry);
  }


  handleAddButtonClick() {
    const { poll, addEntry } = this.props;
    const node = this.refs.title;
    const title =  node.value.trim();
    addEntry(poll.id, title);
    node.value = '';
    /*******************************************/
    this.setState({
      addDisabled: true
    });
  }

  handleOnChangeTitle() {
    const node = this.refs.title;
    const title =  node.value.trim();
    this.setState({
      addDisabled: title.length === 0
    });
  }

  handleOnTitleKeyDown(event) {
    const ENTER_KEY = 13;
    if (event.keyCode === ENTER_KEY && !this.state.addDisabled) {
      this.handleAddButtonClick();
    }
  }

  /************************************************/

/*******************************************************************/
  handleEditClick(idEntry) {
    const title = document.getElementById('input-' + idEntry);
    this.setState({
      editing: true,
      idEntry
    });
    title.value = this.props.poll.entries[idEntry].title;
    setTimeout(() => title.focus(), 0);
    setTimeout(() => title.setSelectionRange(0, title.value.length), 0);
  }

  handleCancelClick() {
    this.setState({
      editing: false,
      idEntry: ''
    });
  }

  handleOkClick() {
    const idEntry = this.state.idEntry;
    const newTitle = document.getElementById('input-' + idEntry).value.trim();
    this.setState({
      editing: false
    });
    this.props.editEntryTitle(this.props.poll.id, idEntry, newTitle);
  }


  render() {
    const { poll } = this.props;
    const entries = poll.entries || {};

    return (
      <div className="panel-body">
          <h3>Entries</h3>
          <ul className="list-group">
            {
              Object.keys(entries).map( (id, index) =>
                <div key={index}>
                  <li style={{height: '55px'}} className={`list-group-item ${this.state.editing && this.state.idEntry === id ? 'hidden' : ''}`} key={index}>{entries[id].title}
                    <span style={{'marginLeft': '20px'}} className="btn glyphicon glyphicon-edit" onClick={ () => this.handleEditClick(id) }/>
                    <button onClick={() => this.handleRemoveButtonClick(poll.id, id)} className="btn btn-warning pull-right">
                      <span className="glyphicon glyphicon-trash"/>
                    </button>
                  </li>
                  <div className={`input-group ${this.state.editing && this.state.idEntry === id ? '' : 'hidden'}`}>
                    <input className="form-control" id={'input-' + id}/>
                    <span className="input-group-btn">
                      <button className="btn btn-danger" type="button" onClick={e => this.handleCancelClick(e)}><span className="glyphicon glyphicon-remove" /></button>
                      <button className="btn btn-success" type="button" onClick={e => this.handleOkClick(e)}><span className="glyphicon glyphicon-ok" /></button>
                    </span>
                  </div>
                </div>)
            }
         </ul>
          <div className="input-group">
            {/* onKeyDown & onChange **************************************/}
            <input type="text" className="form-control" placeholder="Entry Title" ref="title" onKeyDown={e => this.handleOnTitleKeyDown(e)} onChange={e => this.handleOnChangeTitle(e)}/>
            <span className="input-group-btn">
              {/* disable button **************************************/}
              <button disabled={this.state.addDisabled} className="btn btn-info" type="button" onClick={e => this.handleAddButtonClick(e)}>Add Entry</button>
            }
            </span>
          </div>
      </div>
    );
  }
}

EntryList.propTypes = {
  poll: PropTypes.object.isRequired,
  addEntry: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
  editEntryTitle: PropTypes.func
};

EntryList.defaultProps = {
  entries: []
};
