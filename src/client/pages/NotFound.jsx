import React from 'react';

export default class NotFoundPage extends React.Component {
  static route = '*';

  static meta() {
    return {
      bodyClasses: 'page-not-found',
      robots: 'noindex'
    };
  }

  render() {
    return (
      <div />
    );
  }
}
