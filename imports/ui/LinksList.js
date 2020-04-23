import React from 'react';
import FlipMove from 'react-flip-move';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      links:[]
    };
  }
  componentDidMount() {
      this.linksTracker = Tracker.autorun(() => {
        Meteor.subscribe('links');
        const links = Links.find({
          visible: Session.get('showVisible')
        }).fetch();
        this.setState({ links });
      });
  }
  componentWillUnmount(){
    console.log('componentWillUnmount LinksList');
    this.linksTracker.stop();
  }
  renderLinksListItems(){
    if (this.state.links.length === 0){
      return (
        <div className="item">
          <p className="item__message">No Links Found.</p>
        </div>
      );
    } else {
      return this.state.links.map((link) => {
        const shortUrl = Meteor.absoluteUrl(link._id);
        return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
            // <p key={link._id}>{link.url}
            //   <button className="button button--round" onClick={() => Meteor.call('links.remove', link._id)}>X</button>
            // </p>
      });
    }
  }
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true} duration={300}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
};
