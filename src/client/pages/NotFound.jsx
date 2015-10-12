import React from 'react';

export default class NotFoundPage extends React.Component {

  // Catch-all route
  static route = '*';

  static meta() {
    return {
      bodyClasses: 'page-not-found',
      robots: 'noindex'
    };
  }

  render() {
    return (
      <div>
        <p>Page not found.</p>
      </div>
    );
  }
}
