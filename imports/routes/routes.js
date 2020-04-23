import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

// route components
import Login from '/imports/ui/Login';
import Signup from '/imports/ui/Signup';
import Link from '/imports/ui/Link';
import NotFound from '/imports/ui/NotFound';

const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/links'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/links');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" render={() => {
        onEnterPublicPage();
        return <Login/>;
      }}/>
      <Route path="/signup" render={() => {
        onEnterPublicPage();
        return <Signup/>;
      }}/>
      <Route path="/links" render={() => {
        onEnterPrivatePage();
        return <Link/>;
      }}/>
      <Route render={() => <NotFound/>}/>
    </Switch>
  </Router>
);

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace('/links');
  } else if (!isAuthenticated && isAuthenticatedPage) {
    browserHistory.replace('/');
  }
};
