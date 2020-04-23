import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

// visitedCount 0 1 2 3...
// lastVisitedAt null 2340528810 (timestamp)
Modal.setAppElement('#app');

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const { url } = this.state;  // same as 'const url = this.state.url'

    //Links.insert({ url , userId: Meteor.userId() });
    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.setState({ isOpen: false, url: '', error: '' });
      } else {
        this.setState({ error: err.reason });
        this.refs.url.focus();
      }
    });
  }

  onChange(e) {
    this.setState({
      'url':e.target.value.trim()
    });
  }
  handleModalClose(){
    this.setState({isOpen: false, url: '', error: ''})
  }
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={() => this.handleModalClose()}
          overlayClassName="boxed-view boxed-view__modal"
          className="boxed-view__box">
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form className="boxed-view__form"
            onSubmit={this.onSubmit.bind(this)}
          >
            <input type="text" placeholder="URL" ref="url"
              value={this.state.url}
              onChange={this.onChange.bind(this)}/>
            <button className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={() => this.handleModalClose()}>Cancel</button>
          </form>
          {/* in the line above, you could use onClick={this.handleModalClose.bind(this)} */}
        </Modal>
      </div>
    );
  }
}
