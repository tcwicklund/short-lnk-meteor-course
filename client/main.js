import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { render } from 'react-dom';

import { onAuthChange, renderRoutes } from '../imports/routes/routes';
import '../imports/startup/simple-schema-config';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

// // Stateless functional components
// import React from 'react';
// const MyComponent = (props) => {
//   return (
//     <div>
//       <h1>MyComponent is here! {props.name}</h1>
//     </div>
//   );
// };

Meteor.startup(() => {
  // Meteor.call('addNumbers', 100,50, (err, res) => {
  //   console.log('AddNumbers Arguments', err, res);
  // });

  Session.set('showVisible', true);

  render(renderRoutes(), document.getElementById('app'));
});
